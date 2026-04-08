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
    interviewerId: undefined,
    candidat: '',
    statut: ''
  };
  @Input() interviewers: Interviewer[] = [];
  @Input() totalCount = 0;
  @Output() onFilterChange = new EventEmitter<InterviewFilters>();
  @Output() onReset = new EventEmitter<void>();

  get selectedInterviewerName(): string {
    if (!this.filters.interviewerId) return 'Interviewer';
    const found = this.interviewers.find(i => i.id === this.filters.interviewerId);
    return found ? found.nom : 'Interviewer';
  }

  applyFilters(): void {
    this.onFilterChange.emit(this.filters);
  }

  reset(): void {
    this.filters = {
      dateDebut: '',
      dateFin: '',
      interviewerId: undefined,
      candidat: '',
      statut: ''
    };
    this.onReset.emit();
  }

  selectInterviewer(id: number | undefined, nom: string): void {
    this.filters.interviewerId = id;
    this.applyFilters();
  }

  selectStatut(statut: string): void {
    this.filters.statut = statut;
    this.applyFilters();
  }
}