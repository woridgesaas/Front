
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Components
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { InterviewFiltersComponent } from '../../components/interview-filters/interview-filters.component';
import { InterviewTableComponent } from '../../components/interview-table/interview-table.component';
import { CreateInterviewModalComponent } from '../../components/modals/create-interview-modal/create-interview-modal.component';
import { EditInterviewModalComponent } from '../../components/modals/edit-interview-modal/edit-interview-modal.component';
import { CancelInterviewModalComponent } from '../../components/modals/cancel-interview-modal/cancel-interview-modal.component';
// import { DeleteInterviewModalComponent } from '../../components/modals/delete-interview-modal/delete-interview-modal.component';
import { DetailInterviewModalComponent } from '../../components/modals/detail-interview-modal/detail-interview-modal.component';
import { SuccessModalComponent } from '../../components/modals/success-modal/success-modal.component';

// Services & Models
import { InterviewService } from '../../services/interview.service';
import { Interview, InterviewFilters, CandidatInfo, InterviewerInfo } from '../../models/interview.model';
import { Interviewer } from '../../models/interviewer.model';

@Component({
  selector: 'app-interviews-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbsComponent,
    FooterComponent,
    InterviewFiltersComponent,
    InterviewTableComponent,
    CreateInterviewModalComponent,
    EditInterviewModalComponent,
    CancelInterviewModalComponent,
    // DeleteInterviewModalComponent,
    DetailInterviewModalComponent,
    SuccessModalComponent
  ],
  templateUrl: './interviews-planning.component.html',
  styleUrls: ['./interviews-planning.component.scss']
})
export class InterviewsPlanningComponent implements OnInit, OnDestroy {
  // ========== DONNÉES ==========
  interviews: Interview[] = [];
  filteredInterviews: Interview[] = [];
  interviewers: Interviewer[] = [];

  // ========== FILTRES ==========
  filters: InterviewFilters = this.initializeFilters();

  // ========== MODALS ==========
  newInterview: Partial<Interview> = this.initializeNewInterview();
  interviewToEdit: Interview | null = null;
  interviewToCancel: Interview | null = null;
  interviewToDelete: Interview | null = null;
  interviewDetail: Interview | null = null;

  // ========== UI STATE ==========
  showSuccess = false;
  successTitle = '';
  successMessage = '';

  breadcrumbItems = [
    { label: 'Recrutement' },
    { label: 'Planification des Entretiens', active: true }
  ];

  // ========== CLEAN ==========
  private destroy$ = new Subject<void>();

  constructor(private interviewService: InterviewService) {}

  // ========== LIFECYCLE ==========

  ngOnInit(): void {
    this.loadInterviews();
    this.loadInterviewers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========== INITIALISATION ==========

  private initializeFilters(): InterviewFilters {
    return {
      dateDebut: '',
      dateFin: '',
      interviewer: '',
      candidat: '',
      statut: ''
    };
  }

  private initializeNewInterview(): Partial<Interview> {
    return {
      candidat: { nom: '', email: '', poste: '', photo: 'default-avatar.jpg', telephone: '' } as CandidatInfo,
      interviewer: { nom: '', email: '', photo: 'default-avatar.jpg' } as InterviewerInfo,
      date: '',
      heure: '',
      duree: 60,
      type: 'Visioconférence',
      statut: 'Planifié',
      validationIA: false,
      lienVisio: '',
      salle: '',
      notes: ''
    };
  }

  // ========== CHARGEMENT DES donnees ==========

  private loadInterviews(): void {
    this.interviewService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.interviews = data;
          this.applyFilters();
        },
        error: (err) => this.handleError('Erreur lors du chargement des entretiens', err)
      });
  }

  private loadInterviewers(): void {
    this.interviewService.getInterviewers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.interviewers = data,
        error: (err) => this.handleError('Erreur lors du chargement des interviewers', err)
      });
  }

  // ========== FILTRAGE ==========

  applyFilters(): void {
    this.filteredInterviews = this.interviewService.filter(this.interviews, this.filters);
  }

  onFilterChange(filters: InterviewFilters): void {
    this.filters = filters;
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = this.initializeFilters();
    this.applyFilters();
  }

  // ========== CRÉATION ==========

  openCreateModal(): void {
    this.newInterview = this.initializeNewInterview();
  }

  createInterview(interview: Partial<Interview>): void {
    if (!this.validateInterview(interview)) {
      alert(' Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newInterview = this.buildInterview(interview);

    this.interviewService.create(newInterview)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created) => this.handleInterviewCreated(created),
        error: (err) => this.handleError('Erreur lors de la création', err)
      });
  }

  cancelCreate(): void {
    this.newInterview = this.initializeNewInterview();
  }

  private buildInterview(partial: Partial<Interview>): Interview {
    return {
      id: 'ENT-' + Date.now(),
      candidat: partial.candidat!,
      interviewer: partial.interviewer!,
      date: partial.date!,
      heure: partial.heure!,
      duree: partial.duree || 60,
      type: partial.type || 'Visioconférence',
      statut: 'Planifié',
      lienVisio: partial.lienVisio,
      salle: partial.salle,
      notes: partial.notes,
      scoreIA: partial.scoreIA,
      validationIA: partial.validationIA || false
    };
  }

  private handleInterviewCreated(interview: Interview): void {
    this.interviews.unshift(interview);
    this.applyFilters();
    this.showSuccessMessage(
      'Entretien Planifié !',
      `L'entretien avec ${interview.candidat.nom} a été créé avec succès.`
    );
  }

  // ========== MODIFICATION ==========

  openEditModal(interview: Interview): void {
    this.interviewToEdit = { ...interview };
  }

  updateInterview(interview: Interview): void {
    this.interviewService.update(interview.id, interview)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleInterviewUpdated(interview),
        error: (err) => this.handleError('Erreur lors de la modification', err)
      });
  }

  cancelEdit(): void {
    this.interviewToEdit = null;
  }

  private handleInterviewUpdated(interview: Interview): void {
    const index = this.interviews.findIndex(i => i.id === interview.id);
    if (index !== -1) {
      this.interviews[index] = { ...interview };
      this.applyFilters();
    }
    this.showSuccessMessage('Entretien Modifié !', 'Les modifications ont été enregistrées.');
  }

  // ========== SUPPRESSION ==========

  // openDeleteModal(interview: Interview): void {
  //   this.interviewToDelete = interview;
  // }

  deleteInterview(interview: Interview): void {
    this.interviewToDelete = interview;

    this.interviewService.delete(this.interviewToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleInterviewDeleted(this.interviewToDelete!.id),
        error: (err) => this.handleError('Erreur lors de la suppression', err)
      });
  }

  cancelDelete(): void {
    this.interviewToDelete = null;
  }

  private handleInterviewDeleted(id: string): void {
    this.interviews = this.interviews.filter(i => i.id !== id);
    this.applyFilters();
    this.showSuccessMessage('Entretien Supprimé', 'L\'entretien a été supprimé.');
    this.interviewToDelete = null;
  }

  // ========== ANNULATION ==========

  openCancelModal(interview: Interview): void {
    this.interviewToCancel = interview;
  }

  cancelInterview(raison: string): void {
    if (!this.interviewToCancel || !raison.trim()) {
      alert('Veuillez indiquer la raison de l\'annulation');
      return;
    }

    this.handleInterviewCancelled(this.interviewToCancel, raison);
  }

  closeCancelModal(): void {
    this.interviewToCancel = null;
  }

  private handleInterviewCancelled(interview: Interview, raison: string): void {
    const index = this.interviews.findIndex(i => i.id === interview.id);
    if (index !== -1) {
      this.interviews[index].statut = 'Annulé';
      this.interviews[index].notes = (this.interviews[index].notes || '') + '\n[Annulé] ' + raison;
      this.applyFilters();
      this.showSuccessMessage('Entretien Annulé', 'Les participants ont été notifiés.');
    }
    this.interviewToCancel = null;
  }

  // ========== DÉTAILS ==========

  openDetails(interview: Interview): void {
    this.interviewDetail = interview;
  }

  closeDetails(): void {
    this.interviewDetail = null;
  }

  // ========== CHANGEMENT STATUT ==========

  changeStatus(event: { interview: Interview; status: string }): void {
    this.interviewService.updateStatus(event.interview.id, event.status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          event.interview.statut = event.status as any;
          this.applyFilters();
        },
        error: (err) => this.handleError('Erreur lors du changement de statut', err)
      });
  }

  // ========== VALIDATION ==========

  private validateInterview(interview: Partial<Interview>): boolean {
    return !!(
      interview.candidat?.nom &&
      interview.candidat?.email &&
      interview.interviewer?.nom &&
      interview.interviewer?.email &&
      interview.date &&
      interview.heure
    );
  }

  // ========== GESTION DES MESSAGES ==========

  showSuccessMessage(title: string, message: string): void {
    this.successTitle = title;
    this.successMessage = message;
    this.showSuccess = true;
  }

  closeSuccess(): void {
    this.showSuccess = false;
  }

  private handleError(message: string, error: any): void {
    console.error('', message, error);
    alert(message);
  }
}