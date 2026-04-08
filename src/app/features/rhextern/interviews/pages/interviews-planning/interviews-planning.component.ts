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
import { DetailInterviewModalComponent } from '../../components/modals/detail-interview-modal/detail-interview-modal.component';
import { SuccessModalComponent } from '../../components/modals/success-modal/success-modal.component';

// Services & Models
import { InterviewService } from '../../services/interview.service';
import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
  UpdateStatusDto,
  InterviewFilters,
  InterviewStatut,
  getStatutValue,
  CreateEvaluationDto
  
} from '../../models/interview.model';
import { Interviewer } from '../../models/interviewer.model';
import { EvaluateInterviewModalComponent } from '../../components/modals/evaluate-interview-modal/evaluate-interview-modal/evaluate-interview-modal.component';
import { AuthService } from '../../../../../core/services/auth.service';

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
    DetailInterviewModalComponent,
    SuccessModalComponent,
    EvaluateInterviewModalComponent
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
  newInterviewDto: Partial<CreateInterviewDto> = this.initializeNewInterview();
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

  private destroy$ = new Subject<void>();

  constructor(  private interviewService: InterviewService,
    private authService: AuthService 
  ) {

  }

get canManage(): boolean {
  return this.authService.canManageInterviews();
}
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
      candidat: '',
      statut: ''
    };
  }

  private initializeNewInterview(): Partial<CreateInterviewDto> {
    return {
      candidateName:  '',
      candidateEmail: '',
      candidatePhone: '',
      targetPosition: '',
      durationMinutes: 60,
      type: 0,  // Visioconference par défaut
      interviewerId:    0,
      interviewerName:  '',
      interviewerEmail: ''
    };
  }

  // ========== CHARGEMENT ==========

  private loadInterviews(): void {
    this.interviewService.getAll(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.interviews = data;
          this.filteredInterviews = data;
        },
        error: (err) => this.handleError('Erreur lors du chargement des entretiens', err)
      });
  }

  private loadInterviewers(): void {
    this.interviewService.getInterviewers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.interviewers = data,
        error: (err) => console.warn('Interviewers non chargés', err)
      });
  }

  // ========== FILTRAGE ==========

  onFilterChange(filters: InterviewFilters): void {
    this.filters = filters;
    this.loadInterviews(); // recharge avec les filtres côté API
  }

  resetFilters(): void {
    this.filters = this.initializeFilters();
    this.loadInterviews();
  }

  // ========== CRÉATION ==========

  openCreateModal(): void {
    this.newInterviewDto = this.initializeNewInterview();
  }

  createInterview(dto: CreateInterviewDto): void {
    this.interviewService.create(dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created) => {
          this.interviews.unshift(created);
          this.filteredInterviews = [...this.interviews];
          this.showSuccessMessage(
            'Entretien Planifié !',
            `L'entretien avec ${created.candidateName} a été créé avec succès.`
          );
        },
        error: (err) => this.handleError('Erreur lors de la création', err)
      });
  }

  cancelCreate(): void {
    this.newInterviewDto = this.initializeNewInterview();
  }

  // ========== MODIFICATION ==========

  openEditModal(interview: Interview): void {
    this.interviewToEdit = { ...interview };
  }

  updateInterview(interview: Interview): void {
    const dto: UpdateInterviewDto = {
      startDateTime:      interview.startDateTime,
      durationMinutes:    interview.durationMinutes,
      type:               this.getTypeValue(interview.type),
      videoConferenceLink: interview.videoConferenceLink,
      location:           interview.location,
      phoneNumber:        interview.phoneNumber,
      notes:              interview.notes
    };

    this.interviewService.update(interview.id, dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          const index = this.interviews.findIndex(i => i.id === updated.id);
          if (index !== -1) {
            this.interviews[index] = updated;
            this.filteredInterviews = [...this.interviews];
          }
          this.showSuccessMessage('Entretien Modifié !', 'Les modifications ont été enregistrées.');
        },
        error: (err) => this.handleError('Erreur lors de la modification', err)
      });
  }

  cancelEdit(): void {
    this.interviewToEdit = null;
  }

  // ========== SUPPRESSION ==========

  deleteInterview(interview: Interview): void {
    this.interviewService.delete(interview.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.interviews = this.interviews.filter(i => i.id !== interview.id);
          this.filteredInterviews = [...this.interviews];
          this.showSuccessMessage('Entretien Supprimé', 'L\'entretien a été supprimé.');
        },
        error: (err) => this.handleError('Erreur lors de la suppression', err)
      });
  }

  // ========== ANNULATION ==========

  openCancelModal(interview: Interview): void {
    this.interviewToCancel = interview;
  }

  cancelInterview(raison: string): void {
    if (!this.interviewToCancel) return;

    const dto: UpdateStatusDto = { status: 5 }; // 5 = Annule

    this.interviewService.updateStatus(this.interviewToCancel.id, dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          const index = this.interviews.findIndex(i => i.id === updated.id);
          if (index !== -1) {
            this.interviews[index] = updated;
            this.filteredInterviews = [...this.interviews];
          }
          this.showSuccessMessage('Entretien Annulé', 'Les participants ont été notifiés.');
          this.interviewToCancel = null;
        },
        error: (err) => this.handleError('Erreur lors de l\'annulation', err)
      });
  }

  closeCancelModal(): void {
    this.interviewToCancel = null;
  }

  // ========== DÉTAILS ==========

  openDetails(interview: Interview): void {
    // Recharge les détails complets depuis l'API
    this.interviewService.getById(interview.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.interviewDetail = data,
        error: (err) => this.handleError('Erreur lors du chargement des détails', err)
      });
  }

  closeDetails(): void {
    this.interviewDetail = null;
  }

  // ========== CHANGEMENT STATUT ==========

  changeStatus(event: { interview: Interview; status: string }): void {
    const dto: UpdateStatusDto = {
      status: getStatutValue(event.status as InterviewStatut)
    };

    this.interviewService.updateStatus(event.interview.id, dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updated) => {
          const index = this.interviews.findIndex(i => i.id === updated.id);
          if (index !== -1) {
            this.interviews[index] = updated;
            this.filteredInterviews = [...this.interviews];
          }
        },
        error: (err) => this.handleError('Erreur lors du changement de statut', err)
      });
  }

  // ========== HELPERS ==========

  private getTypeValue(type: string): number {
    const values: Record<string, number> = {
      'Visioconference': 0,
      'Presentiel':      1,
      'Telephonique':    2
    };
    return values[type] ?? 0;
  }

  // ========== MESSAGES ==========

  showSuccessMessage(title: string, message: string): void {
    this.successTitle = title;
    this.successMessage = message;
    this.showSuccess = true;
  }

  closeSuccess(): void {
    this.showSuccess = false;
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    alert(message);
  }

  // ========== ÉVALUATION ==========
interviewToEvaluate: Interview | null = null;

openEvaluateModal(interview: Interview): void {
  this.interviewToEvaluate = interview;
}

submitEvaluation(dto: CreateEvaluationDto): void {
  if (!this.interviewToEvaluate) return;

  this.interviewService.createEvaluation(this.interviewToEvaluate.id, dto)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.loadInterviews();
        this.showSuccessMessage(
          'Évaluation Soumise !',
          `L'évaluation de ${this.interviewToEvaluate!.candidateName} a été enregistrée.`
        );
        this.interviewToEvaluate = null;
      },
      error: (err) => this.handleError('Erreur lors de la soumission', err)
    });
}

closeEvaluate(): void {
  this.interviewToEvaluate = null;
}
}