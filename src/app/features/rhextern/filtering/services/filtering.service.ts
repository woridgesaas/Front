import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { FilterForm } from '../models/filter-form.model';

@Injectable({ providedIn: 'root' })
export class FiltrageService {

  // ⚠️ Port 5248 — backend .NET direct (ou via Kong selon config)
  private readonly baseUrl = 'http://localhost:8000/api/filtering';

  constructor(private http: HttpClient) {}

  // ── Mapper réponse .NET → Candidate (FilteringResultResponse) ─────────

  private mapToCandidate(raw: any): Candidate {
    return {
      id:               raw.id ?? 0,
      candidateName:    raw.candidateName   || 'Inconnu',
      candidateEmail:   raw.candidateEmail  || '',
      candidatePhone:   raw.candidatePhone  || '',
      location:         raw.location        || '',
      scoreIa:          Math.round(raw.scoreIa ?? 0),
      experienceYears:  raw.experienceYears ?? 0,
      technicalSkills:  raw.technicalSkills ?? [],  // ← nouveau champ
      softSkills:       raw.softSkills      ?? [],  // ← nouveau champ séparé
      missingSkills:    raw.missingSkills   ?? [],  // ← nouveau champ
      recommendation:   raw.recommendation  || 'Not recommended',
      mainDomain:       raw.mainDomain      || '',
      seniorityLevel:   raw.seniorityLevel  || '',
      cvStatus:         raw.cvStatus        || 'pending',
      cvDownloadUrl:    raw.cvDownloadUrl   || '',
      analysisDate:     raw.analysisDate    || '',
    };
  }

  // ── Conversion FilterForm → OfferForm .NET ────────────────────────────
  // ⚠️ PAS d'offerCategory — supprimé
  // ⚠️ PAS de minMatchScore — supprimé

  private toOfferForm(form: FilterForm, profileId: number): any {
    const firstLang = form.languages?.[0];
    return {
      offerTitle:         form.jobTitle,
      description:        '',
      techSkills:         form.techSkills  ?? [],
      tools:              form.tools       ?? [],
      softSkills:         form.softSkills  ?? [],
      certifications:     form.certifications
                            ? form.certifications.split(',').map((c: string) => c.trim()).filter(Boolean)
                            : [],
      degree:             form.diploma     ?? '',
      minExperience:      form.experienceMin ?? 0,
      language:           firstLang?.name  ?? '',
      languageLevel:      firstLang?.level ?? '',
      location:           form.location    ?? '',
      filteringProfileId: profileId,
    };
  }

  // ── 1. Créer profil de filtrage ───────────────────────────────────────

  createFilteringProfile(form: FilterForm): Observable<{ id: number }> {
    const criteriaNames = [
      ...(form.techSkills?.length  ? ['techSkills']     : []),
      ...(form.tools?.length       ? ['tools']          : []),
      ...(form.softSkills?.length  ? ['softSkills']     : []),
      ...(form.experienceMin       ? ['experience']     : []),
      ...(form.diploma             ? ['diploma']        : []),
      ...(form.languages?.length   ? ['language']       : []),
      ...(form.certifications      ? ['certifications'] : []),
    ];

    const payload = {
      profileName:   form.jobTitle,
      offerId:       0,
      criteriaNames,
    };

    return this.http.post<{ id: number }>(`${this.baseUrl}/profiles`, payload);
  }

  // ── 2. Lancer le pipeline sur tous les CVs MinIO ──────────────────────

  filterCandidates(form: FilterForm): Observable<Candidate[]> {
    return this.createFilteringProfile(form).pipe(
      switchMap(({ id }) => {
        const payload = this.toOfferForm(form, id);
        console.log('📤 Payload envoyé au .NET:', payload);
        return this.http
          .post<any[]>(`${this.baseUrl}/analyze-all`, payload)
          .pipe(map((results) => results.map((r) => this.mapToCandidate(r))));
      })
    );
  }

  // ── 3. Récupérer tous les résultats en DB ─────────────────────────────

  getResults(): Observable<Candidate[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/results`)
      .pipe(map((results) => results.map((r) => this.mapToCandidate(r))));
  }

  // ── 4. Accept / Reject ────────────────────────────────────────────────

  acceptCandidate(id: number, offerId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/accept/${id}?offerId=${offerId}`, {});
  }

  rejectCandidate(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reject/${id}`, {});
  }

  // ── 5. URL présignée MinIO → téléchargement CV ────────────────────────

  getCvPresignedUrl(fileName: string): Observable<string> {
    return this.http
      .get<{ url: string }>(`${this.baseUrl}/cv-url?fileName=${encodeURIComponent(fileName)}`)
      .pipe(map((r) => r.url));
  }

  downloadCV(candidate: Candidate): void {
    // Extraction du nom de fichier depuis cvDownloadUrl
    const fileName =
      candidate.cvDownloadUrl?.split('/').pop()?.split('?')[0] ?? 'cv.pdf';

    this.getCvPresignedUrl(fileName).subscribe({
      next: (url) => {
        const a = document.createElement('a');
        a.href     = url;
        a.target   = '_blank';
        a.download = fileName;
        a.click();
      },
      error: () => alert('Impossible de télécharger le CV.'),
    });
  }
}
