
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate, CandidateStatus } from '../../models/candidate.model';

@Component({
  selector: 'app-filter-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss']
})
export class FilterResultsComponent {
  @Input() candidates: Candidate[] = [];
  @Input() isLoading = false;
  @Output() onAction = new EventEmitter<{ type: string; candidate: Candidate }>();

  // Pagination
  pageSize = 10;
  currentPage = 1;

  // Sélection
  selectAll = false;

  // Modal compétences
  showSkillsModal = false;
  selectedSkills: string[] = [];

  /**
   * Change la taille de la page
   */
  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    console.log(' Taille de page changée:', size);
  }

  /**
   * Sélectionne/désélectionne tous les candidats
   */
  toggleSelectAll(): void {
    this.candidates.forEach(candidate => {
      candidate.isSelected = this.selectAll;
    });
    console.log(' Sélection globale:', this.selectAll ? 'activée' : 'désactivée');
  }

  /**
   * Ouvre le modal des compétences
   */
  openSkillsModal(skills: string[]): void {
    this.selectedSkills = skills;
    this.showSkillsModal = true;
    console.log(' Affichage de toutes les compétences:', skills.length);
  }

  /**
   * Ferme le modal des compétences
   */
  closeSkillsModal(): void {
    this.showSkillsModal = false;
    this.selectedSkills = [];
  }

  /**
   * Gère les actions sur un candidat
   */
  handleAction(type: string, candidate: Candidate): void {
    this.onAction.emit({ type, candidate });
  }

  /**
   * Retourne la classe CSS du statut
   */
  getStatusClass(status: CandidateStatus): string {
    const classes: Record<CandidateStatus, string> = {
      'En attente': 'bg-warning',
      'Accepté': 'bg-success',
      'Refusé': 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
  }

  /**
   * Retourne la classe CSS du score IA
   */
  getScoreColor(score: number): string {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }
}