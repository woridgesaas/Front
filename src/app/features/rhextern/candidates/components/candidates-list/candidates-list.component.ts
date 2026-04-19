import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { Candidate, CandidateDetailResponse, CandidateStatus, STATUS_CONFIG } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { DetailsModalComponent } from '../modals/details-modal/details-modal.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../common/footer/footer.component';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { DateRangePickerComponent } from '../../../../common/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatSortModule, RouterOutlet,
    FooterComponent, CustomPaginationComponent, ConfirmDeleteComponent,
    DetailsModalComponent, BreadcrumbsComponent, DateRangePickerComponent,
  ],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.scss'
})
export class CandidatesListComponent implements OnInit, OnDestroy {

  statusConfig = STATUS_CONFIG;
  statusEnum   = CandidateStatus;

  allCandidates:      Candidate[] = [];
  filteredCandidates: Candidate[] = [];

  pageSize        = 10;
  currentPage     = 1;
  totalCandidates = 0;
  searchTerm      = '';
  allSelected     = false;

  // Modal détail
  candidateDetails: CandidateDetailResponse | null = null;
  isDetailsOpen    = false;

  // Modal suppression — contrôle Angular via isOpen
  selectedItem:    Candidate | null = null;
  isDeleteOpen     = false;

  private destroy$ = new Subject<void>();

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void { this.loadCandidates(); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ============ CHARGEMENT ============

  loadCandidates(): void {
    this.candidateService.getCandidates()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (candidates) => {
          this.allCandidates      = candidates;
          this.filteredCandidates = [...candidates];
          this.totalCandidates    = candidates.length;
        },
        error: (err) => console.error('Erreur chargement candidats:', err)
      });
  }

  // ============ RECHERCHE ============

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCandidates = term
      ? this.allCandidates.filter(c =>
          c.applicationName.toLowerCase().includes(term) ||
          c.candidateEmail.toLowerCase().includes(term) ||
          c.candidatePhone.includes(term) ||
          c.detectedCategory.toLowerCase().includes(term))
      : [...this.allCandidates];

    this.totalCandidates = this.filteredCandidates.length;
    this.currentPage     = 1;
  }

  // ============ TRI ============

  onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.filteredCandidates = [...this.allCandidates];
      return;
    }
    this.filteredCandidates = [...this.filteredCandidates].sort((a, b) => {
      const av  = (a as any)[sort.active];
      const bv  = (b as any)[sort.active];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.direction === 'asc' ? cmp : -cmp;
    });
  }

  // ============ SÉLECTION ============

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.paginatedCandidates.forEach(c => c.isSelected = this.allSelected);
  }

  // ============ STATUT ============

  onStatusChange(candidate: Candidate, newStatus: CandidateStatus): void {
    const oldStatus  = candidate.status;
    candidate.status = newStatus;

    this.candidateService.updateStatus(candidate.id, newStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(`Statut mis à jour : ${candidate.applicationName} → ${newStatus}`);
          // sendEmail — réservé pour plus tard
          // if (newStatus === CandidateStatus.HIRED || newStatus === CandidateStatus.REJECTED) {
          //   this.candidateService.sendEmail(candidate.id, newStatus === CandidateStatus.HIRED ? 'hired' : 'rejected');
          // }
        },
        error: (err) => {
          console.error('Erreur mise à jour statut:', err);
          candidate.status = oldStatus; // rollback optimiste
        }
      });
  }

  // ============ SUPPRESSION ============

  openDeleteModal(candidate: Candidate): void {
    this.selectedItem = candidate;
    this.isDeleteOpen = true;
  }

  confirmDelete(candidate: Candidate): void {
    this.candidateService.delete(candidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.allCandidates      = this.allCandidates.filter(c => c.id !== candidate.id);
          this.filteredCandidates = this.filteredCandidates.filter(c => c.id !== candidate.id);
          this.totalCandidates    = this.filteredCandidates.length;
          this.isDeleteOpen       = false;
          this.selectedItem       = null;
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          this.isDeleteOpen = false;
        }
      });
  }

  cancelDelete(): void {
    this.isDeleteOpen = false;
    this.selectedItem = null;
  }

  // ============ DÉTAIL — ouverture manuelle après HTTP ============

  openDetailsModal(candidate: Candidate): void {
    this.candidateDetails = null;
    this.isDetailsOpen    = false;

    this.candidateService.getById(candidate.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detail) => {
          this.candidateDetails = detail;
          this.isDetailsOpen    = true;  // ouvre APRÈS réception des données
        },
        error: (err) => console.error('Erreur chargement détail:', err)
      });
  }

  onDetailsClose(): void {
    this.isDetailsOpen    = false;
    this.candidateDetails = null;
  }

  // ============ CV ============

  onViewCV(candidate: Candidate): void {
    this.candidateService.viewCV(candidate.id);
  }

  onDownloadCV(candidate: Candidate): void {
    this.candidateService.downloadCV(candidate.id, candidate.applicationName);
  }

  // ============ PAGINATION ============

  onPageSizeChange(): void { this.currentPage = 1; }

  get paginatedCandidates(): Candidate[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCandidates.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalCandidates / this.pageSize);
  }

  getAvailableStatuses(): CandidateStatus[] {
    return Object.values(CandidateStatus);
  }

  // ============ FILTRES HEADER ============

  get availableCategories(): string[] {
    return [...new Set(this.allCandidates.map(c => c.detectedCategory).filter(Boolean))].sort();
  }

  filterByCategory(category: string): void {
    this.filteredCandidates = category
      ? this.allCandidates.filter(c => c.detectedCategory === category)
      : [...this.allCandidates];
    this.totalCandidates = this.filteredCandidates.length;
    this.currentPage     = 1;
  }

  filterByStatus(status: string): void {
    this.filteredCandidates = status
      ? this.allCandidates.filter(c => c.status === status)
      : [...this.allCandidates];
    this.totalCandidates = this.filteredCandidates.length;
    this.currentPage     = 1;
  }

  sortBy(field: string, direction: 'asc' | 'desc'): void {
    this.filteredCandidates = [...this.filteredCandidates].sort((a, b) => {
      const av  = (a as any)[field];
      const bv  = (b as any)[field];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return direction === 'asc' ? cmp : -cmp;
    });
  }

  // ============ AVATAR ============

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
}
