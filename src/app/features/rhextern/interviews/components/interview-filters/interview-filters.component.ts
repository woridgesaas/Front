
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterviewFilters } from '../../models/interview.model';
import { Interviewer } from '../../models/interviewer.model';

@Component({
  selector: 'app-interview-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-filters.component.html',
  styleUrls: ['./interview-filters.component.scss']
})
export class InterviewFiltersComponent {
  @Input() filters: InterviewFilters = {
    dateDebut: '',
    dateFin: '',
    interviewer: '',
    candidat: '',
    statut: ''
  };
  @Input() interviewers: Interviewer[] = [];
  @Input() totalCount = 0;

  @Output() onFilterChange = new EventEmitter<InterviewFilters>();
  @Output() onReset = new EventEmitter<void>();

  /**
   * Applique les filtres
   */
  applyFilters(): void {
    this.onFilterChange.emit(this.filters);
  }

  /**
   * Réinitialise les filtres
   */
  reset(): void {
    this.filters = {
      dateDebut: '',
      dateFin: '',
      interviewer: '',
      candidat: '',
      statut: ''
    };
    this.onReset.emit();
  }

  /**
   * Sélectionne un interviewer
   */
  selectInterviewer(nom: string): void {
    this.filters.interviewer = nom;
    this.applyFilters();
  }

  /**
   * Sélectionne un statut
   */
  selectStatut(statut: string): void {
    this.filters.statut = statut;
    this.applyFilters();
  }
}