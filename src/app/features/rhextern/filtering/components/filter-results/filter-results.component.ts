import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate, CandidateStatus } from '../../models/candidate.model';
import { FiltrageService } from '../../services/filtering.service';

@Component({
  selector: 'app-filter-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss']
})
export class FilterResultsComponent {
  @Input() set candidates(value: Candidate[]) {
    // Filtrer : ne montrer que les CVs avec score > 0 (non rejetés par /predict)
    this._candidates = value.filter(c => c.aiScore > 0);
  }
  get candidates(): Candidate[] { return this._candidates; }
  private _candidates: Candidate[] = [];

  @Input() isLoading = false;
  @Output() onAction = new EventEmitter<{ type: string; candidate: Candidate }>();

  pageSize = 10;
  currentPage = 1;
  selectAll = false;

  // Modal compétences
  showSkillsModal = false;
  selectedSkills: string[] = [];

  // Modal détail candidat
  showDetailModal = false;
  selectedCandidate: Candidate | null = null;
constructor(private filtrageService: FiltrageService) {}

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  openSkillsModal(skills: string[]): void {
    this.selectedSkills = skills;
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

  handleAction(type: string, candidate: Candidate): void {
    if (type === 'view') {
      this.openDetailModal(candidate);
      return;
    }
    this.onAction.emit({ type, candidate });
  }

getStatusClass(status: string): string {
  if (status === 'Accepté')                          return 'bg-success';
  if (status === 'En attente')                       return 'bg-warning text-dark';
  if (status === 'En attente de vérification humaine') return 'bg-info text-dark';
  if (status === 'Refusé par IA' || status === 'Refusé') return 'bg-danger';
  return 'bg-secondary';
}
// Statut affiché : RH override en priorité, sinon auto selon score
getDisplayStatus(candidate: Candidate): string {
  // Accepté par RH → priorité absolue
  if (candidate.status === 'Accepté') return 'Accepté';

  // Pour tout le reste, le score IA prime sur la décision backend
  return this.getAutoStatus(candidate);
}
 // Couleur du CERCLE SVG selon score
getCircleColor(score: number): string {
  if (score >= 50) return '#28a745'; // vert
  if (score >= 30) return '#ffc107'; // jaune
  return '#dc3545';                  // rouge
}

// Couleur du texte score
getScoreColor(score: number): string {
  if (score >= 50) return 'text-success';
  if (score >= 30) return 'text-warning';
  return 'text-danger';
}

// Statut automatique selon score
getAutoStatus(candidate: Candidate): string {
  if (candidate.aiScore >= 50) return 'En attente';
  if (candidate.aiScore >= 30) return 'En attente de vérification humaine';
  return 'Refusé par IA';
}
// Ajoute dans FilterResultsComponent.ts

downloadCv(candidate: Candidate): void {
  this.filtrageService.downloadCV(candidate);
}

}
