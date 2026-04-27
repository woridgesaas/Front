import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../models/candidate.model';
import { FiltrageService } from '../../services/filtering.service';

@Component({
  selector: 'app-filter-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss'],
})
export class FilterResultsComponent {
  @Input() set candidates(value: Candidate[]) {
    this._candidates = value;
  }
  get candidates(): Candidate[] { return this._candidates; }
  private _candidates: Candidate[] = [];

  @Input() isLoading = false;
  @Output() onAction = new EventEmitter<{ type: string; candidate: Candidate }>();

  pageSize = 10;
  currentPage = 1;

  // Modal — liste de skills
  showSkillsModal = false;
  selectedSkills: string[] = [];
  skillsModalTitle = '';

  // Modal — détail candidat
  showDetailModal = false;
  selectedCandidate: Candidate | null = null;

  constructor(private filtrageService: FiltrageService) {}

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  // ── Modals ────────────────────────────────────────────────────────────

  openSkillsModal(skills: string[], title: string = 'Compétences'): void {
    this.selectedSkills = skills;
    this.skillsModalTitle = title;
    this.showSkillsModal = true;
  }

  closeSkillsModal(): void {
    this.showSkillsModal = false;
    this.selectedSkills = [];
  }

  openDetailModal(candidate: Candidate): void {
    this.selectedCandidate = candidate;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedCandidate = null;
  }

  // ── Actions ───────────────────────────────────────────────────────────

 // ── Remplacer la méthode handleAction ────────────────────────────────────

handleAction(type: string, candidate: Candidate): void {
  if (type === 'view') { this.openDetailModal(candidate); return; }
  if (type === 'accept') { this.acceptCandidate(candidate); return; }
  if (type === 'reject') { this.rejectCandidate(candidate); return; }
}

// ── Accepter : appel API + retrait immédiat de la liste ──────────────────

private acceptCandidate(candidate: Candidate): void {
  if (candidate.cvStatus === 'accepted') return;

  // Mise à jour optimiste immédiate — on retire de la liste
  this._candidates = this._candidates.filter(c => c.id !== candidate.id);

  // Appel API en arrière-plan
  this.filtrageService.acceptCandidate(candidate.id, 0).subscribe({
    error: (err) => {
      console.error('Erreur acceptation:', err);
      // En cas d'erreur : remettre le candidat avec statut inchangé
      this._candidates = [...this._candidates, candidate];
    }
  });
}

// ── Refuser : appel API + mise à jour statut local ───────────────────────

private rejectCandidate(candidate: Candidate): void {
  if (candidate.cvStatus === 'rejected') return;

  // Mise à jour optimiste immédiate — désactive les deux boutons
  const idx = this._candidates.findIndex(c => c.id === candidate.id);
  if (idx !== -1) {
    this._candidates[idx] = { ...this._candidates[idx], cvStatus: 'rejected' };
    this._candidates = [...this._candidates];
  }

  // Appel API en arrière-plan
  this.filtrageService.rejectCandidate(candidate.id).subscribe({
    error: (err) => {
      console.error('Erreur refus:', err);
      // En cas d'erreur : rétablir statut pending
      if (idx !== -1) {
        this._candidates[idx] = { ...this._candidates[idx], cvStatus: 'pending' };
        this._candidates = [...this._candidates];
      }
    }
  });
}

  // ── CV ────────────────────────────────────────────────────────────────

  viewCv(candidate: Candidate): void {
    // Ouvre le CV dans un nouvel onglet sans forcer le téléchargement
    const fileName =
      candidate.cvDownloadUrl?.split('/').pop()?.split('?')[0] ?? 'cv.pdf';
    this.filtrageService.getCvPresignedUrl(fileName).subscribe({
      next: (url) => window.open(url, '_blank'),
      error: () => alert('Impossible d\'ouvrir le CV.'),
    });
  }

  downloadCv(candidate: Candidate): void {
    this.filtrageService.downloadCV(candidate);
  }

  // ── Score IA — cercle SVG ─────────────────────────────────────────────
  // Couleurs seuils : vert ≥75 / orange ≥55 / rouge <55

  getCircleColor(score: number): string {
    if (score >= 75) return '#28a745'; // vert
    if (score >= 55) return '#ffc107'; // orange/jaune
    return '#dc3545';                  // rouge
  }

  getScoreTextClass(score: number): string {
    if (score >= 75) return 'text-success';
    if (score >= 55) return 'text-warning';
    return 'text-danger';
  }

  // ── Recommendation badge ──────────────────────────────────────────────

  getRecommendationClass(rec: string): string {
    switch (rec) {
      case 'Strongly recommended': return 'bg-success text-white';
      case 'Recommended':          return 'bg-soft-success text-success';
      case 'Weakly recommended':   return 'bg-warning text-dark';
      case 'Not recommended':      return 'bg-danger text-white';
      default:                     return 'bg-secondary text-white';
    }
  }

  getRecommendationLabel(rec: string): string {
    switch (rec) {
      case 'Strongly recommended': return 'Fortement recommandé';
      case 'Recommended':          return 'Recommandé';
      case 'Weakly recommended':   return 'Faiblement recommandé';
      case 'Not recommended':      return 'Non recommandé';
      default:                     return rec || '—';
    }
  }

  // ── Seniority badge ───────────────────────────────────────────────────

  getSeniorityClass(level: string): string {
    switch (level) {
      case 'Expert': return 'bg-soft-primary text-primary';
      case 'Senior': return 'bg-soft-info text-info';
      case 'Mid':    return 'bg-soft-success text-success';
      case 'Junior': return 'bg-soft-warning text-warning';
      case 'Student':return 'bg-soft-secondary text-secondary';
      default:       return 'bg-soft-secondary text-secondary';
    }
  }

  // ── CvStatus badge ────────────────────────────────────────────────────
  // ✅ pending → JAUNE (bg-warning text-dark) comme l'ancien système

  getCvStatusClass(status: string): string {
    switch (status) {
      case 'accepted': return 'bg-success text-white';
      case 'rejected': return 'bg-danger text-white';
      case 'pending':
      default:         return 'bg-warning text-dark'; // ← jaune
    }
  }

  getCvStatusLabel(status: string): string {
    switch (status) {
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      case 'pending':
      default:         return 'En attente';
    }
  }
}
