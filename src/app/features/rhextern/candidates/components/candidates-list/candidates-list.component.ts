import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { Candidate, CandidateStatus, STATUS_CONFIG } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { DetailsModalComponent } from '../modals/details-modal/details-modal.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { PaginationService } from '../../../../../shared/custom-pagination/pagination.service';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { DateRangePickerComponent } from '../../../../common/date-range-picker/date-range-picker.component';
// import { ConfirmDeleteComponent } from '../../../../../shared/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    RouterOutlet,
    FooterComponent,
    CustomPaginationComponent,
    ConfirmDeleteComponent,
    DetailsModalComponent,
    BreadcrumbsComponent,
    DateRangePickerComponent,
  ],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.scss'
})
export class CandidatesListComponent implements OnInit, OnDestroy {
  
  // Configuration des statuts
  statusConfig = STATUS_CONFIG;
  statusEnum = CandidateStatus;
  
  // Données
  allCandidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  
  // Pagination
  pageSize = 10;
  currentPage = 1;
  totalCandidates = 0;
  
  // Recherche
  searchTerm = '';
  
  // Sélection
  allSelected = false;
  
  // Modales
  candidateToDelete: Candidate | null = null;
  candidateDetails: Candidate | null = null;
  selectedItem: Candidate | null = null; // Pour le composant générique ConfirmDelete
  
  // Gestion des subscriptions
  private destroy$ = new Subject<void>();

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============ CHARGEMENT DES DONNÉES ============

  loadCandidates(): void {
    this.candidateService
      .getCandidates()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.allCandidates = response.data;
          this.filteredCandidates = [...response.data];
          this.totalCandidates = response.totalData;
        },
        error: (error) => {
          console.error(' Erreur chargement:', error);
        }
      });
  }

  // ============ RECHERCHE ============

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCandidates = [...this.allCandidates];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredCandidates = this.allCandidates.filter(c =>
        c.Candidate.toLowerCase().includes(term) ||
        c.Email.toLowerCase().includes(term) ||
        c.Phone.includes(term) ||
        c.Applied_Role.toLowerCase().includes(term)
      );
    }
    this.totalCandidates = this.filteredCandidates.length;
    this.currentPage = 1;
  }

  // ============ TRI ============

  onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.filteredCandidates = [...this.allCandidates];
      return;
    }

    this.filteredCandidates = [...this.filteredCandidates].sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }

  // ============ SÉLECTION ============

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.paginatedCandidates.forEach(c => c.isSelected = this.allSelected);
  }

  // ============ CHANGEMENT DE STATUT ============

  onStatusChange(candidate: Candidate, newStatus: CandidateStatus): void {
    const oldStatus = candidate.Status;
    candidate.Status = newStatus;

    this.candidateService
      .updateStatus(candidate.Cand_ID, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(` Statut mis à jour: ${candidate.Candidate} → ${newStatus}`);
          
          // Envoyer email si nécessaire
          if (newStatus === CandidateStatus.HIRED || newStatus === CandidateStatus.REJECTED) {
            const emailType = newStatus === CandidateStatus.HIRED ? 'hired' : 'rejected';
            this.sendEmail(candidate, emailType);
          }
        },
        error: (error) => {
          console.error(' Erreur mise à jour:', error);
          candidate.Status = oldStatus;
        }
      });
  }

  private sendEmail(candidate: Candidate, type: 'hired' | 'rejected'): void {
    this.candidateService
      .sendEmail(candidate.Cand_ID, type)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log(` Email ${type} envoyé`),
        error: (error) => console.error(' Erreur email:', error)
      });
  }

  // ============ SUPPRESSION ============

  openDeleteModal(candidate: Candidate): void {
    this.selectedItem = candidate;
  }

  confirmDelete(candidate: Candidate): void {
    this.candidateService
      .delete(candidate.Cand_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.allCandidates = this.allCandidates.filter(c => c.Cand_ID !== candidate.Cand_ID);
          this.filteredCandidates = this.filteredCandidates.filter(c => c.Cand_ID !== candidate.Cand_ID);
          this.totalCandidates = this.filteredCandidates.length;
          
          console.log(` Candidat ${candidate.Candidate} supprimé avec succès`);
        },
        error: (error) => {
          console.error(' Erreur suppression:', error);
        }
      });
    
    this.selectedItem = null;
  }

  // ============ DÉTAILS ============

  openDetailsModal(candidate: Candidate): void {
    this.candidateDetails = { ...candidate };
  }

  onDetailsClose(): void {
    this.candidateDetails = null;
  }

  // ============ CV ============

  onViewCV(candidate: Candidate): void {
    console.log(' Voir CV:', candidate.Candidate);
    //  Implémenter la visualisation
  }

  onDownloadCV(candidate: Candidate): void {
    console.log(' Télécharger CV:', candidate.Candidate);
    // Implémenter le téléchargement
  }

  // ============ PAGINATION ============

  onPageSizeChange(): void {
    this.currentPage = 1;
  }

  get paginatedCandidates(): Candidate[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCandidates.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.totalCandidates / this.pageSize);
  }

  // ============ UTILITAIRES ============

  getAvailableStatuses(): CandidateStatus[] {
    return Object.values(CandidateStatus);
  }
}