import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { Candidate, CandidateStatus } from '../models/candidate.model';
import { FilterForm } from '../models/filter-form.model';


@Injectable({ providedIn: 'root' })
export class FiltrageService {
  private readonly baseUrl = 'http://localhost:8000/api/filtering';

  // ✅ APRÈS
constructor(private http: HttpClient) {}

  // ── Mapper réponse .NET → Candidate Angular ──────────────────────────

  private mapToCandidate(raw: any): Candidate {
    return {
      id: raw.id ?? 0,
      candidateId: `#${raw.id ?? 0}`,
      name: raw.candidateName || raw.name || 'Inconnu',
      email: raw.candidateEmail || raw.email || '',
      phone: raw.candidatePhone || raw.phone || '',
      location: raw.location || raw.candidateLocation || '',
      aiScore: Math.round(raw.scoreIa ?? raw.globalScore ?? 0),
      isCompatible: (raw.scoreIa ?? raw.globalScore ?? 0) > 0,
      category: raw.detectedCategory || '',
      explanation: raw.explanation || '',
      status: (raw.decision as CandidateStatus) ?? 'En attente',
      experienceYears: raw.experienceYears ?? 0,
      skills: raw.skills ?? [],
      cvUrl: raw.cvDownloadUrl || '',
      isSelected: false,
    };
  }

  // ── Conversion FilterForm → OfferForm .NET ───────────────────────────
  // Le form est déjà traduit en anglais par FilterFormComponent

private toOfferForm(form: FilterForm, profileId: number): any {
  const firstLang = form.languages[0];
  return {
    offerTitle: form.jobTitle,
    offerCategory: form.jobTitle,
    techSkills: form.skills,
    tools: form.tools,
    softSkills: form.softSkills,
    certifications: form.certifications
      ? form.certifications.split(',').map((c: string) => c.trim()).filter(Boolean)
      : [],
    degree: form.diploma ?? '',
    minExperience: form.experienceMin ?? 0,
    language: firstLang?.name ?? '',
    languageLevel: firstLang?.level ?? '',
    location: form.location ?? '',
    minMatchScore: form.minAiScore ?? 60.0,
    cvMinioPath: '',
    filteringProfileId: profileId,
  };
}

  // ── API ──────────────────────────────────────────────────────────────

 // 3. Modifier filterCandidates() — chaîner les deux appels
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

// Mise à jour locale du statut (style tag uniquement — pas d'appel HTTP)
updateStatus(id: number, status: string): void {
  // utilisé uniquement pour la mise à jour visuelle locale
}
   acceptCandidate(id: number, offerId: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/accept/${id}?offerId=${offerId}`,
      {}
    );
  }
  rejectCandidate(id: number): Observable<any> {
  return this.http.patch(`${this.baseUrl}/reject/${id}`, {});
}
  getCvPresignedUrl(fileName: string): Observable<string> {
    return this.http
      .get<{ url: string }>(
        `${this.baseUrl}/cv-url?fileName=${encodeURIComponent(fileName)}`
      )
      .pipe(map((r) => r.url));
  }
  downloadCV(candidate: Candidate): void {
  const fileName = candidate.cvUrl.split('/').pop()?.split('?')[0] ?? 'cv.pdf';

  this.getCvPresignedUrl(fileName).subscribe({  // ✅ this. direct
    next: (url) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = fileName;
      a.click();
    },
    error: () => alert('Impossible de télécharger le CV.'),
  });
}
// 1. Nouvelle méthode createFilteringProfile()
createFilteringProfile(form: FilterForm): Observable<{ id: number }> {
  const payload = {
    profileName: form.jobTitle,
    offerId: 0,
    criteriaNames: [
      ...form.skills.length > 0 ? ['techSkills'] : [],
      ...form.tools.length > 0 ? ['tools'] : [],
      ...form.softSkills.length > 0 ? ['softSkills'] : [],
      ...form.experienceMin ? ['experience'] : [],
      ...form.diploma ? ['diploma'] : [],
      ...form.languages.length > 0 ? ['language'] : [],
      ...form.certifications ? ['certifications'] : [],
    ]
  };
  return this.http.post<{ id: number }>(
    `${this.baseUrl}/profiles`, payload
  );
}

}
