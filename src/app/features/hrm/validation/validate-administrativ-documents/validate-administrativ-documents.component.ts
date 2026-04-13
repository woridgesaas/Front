import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { RhDocumentDemande } from '../../../../shared/models/models';
import { DocumentsApiService } from '../../../../shared/services/documents-api.service';
import { DocumentsKpisComponent } from './components/documents-kpis/documents-kpis.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { AcceptModalComponent } from './components/accept-modal/accept-modal.component';
import { RejectModalComponent } from './components/reject-modal/reject-modal.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';

@Component({
  selector: 'app-validate-administrativ-documents',
  imports: [
    DetailsModalComponent,
    AcceptModalComponent,
    RejectModalComponent,
    BreadcrumbsComponent,
    DocumentsKpisComponent,
    BsDatepickerModule,
    CommonModule,
    FormsModule,
    DocumentsListComponent,
    CustomPaginationComponent
  ],
  templateUrl: './validate-administrativ-documents.component.html',
  styleUrl: './validate-administrativ-documents.component.scss',
})
export class ValidateAdministrativDocumentsComponent implements OnInit {

  // Data
  allDemandes: RhDocumentDemande[] = [];
  filteredDemandes: RhDocumentDemande[] = [];
  kpiData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Filtres
  searchText: string = '';
  dateRange: Date[] = [];
  selectedType: string = '';
  selectedStatus: string = '';

  // Filtres disponibles
  documentTypes: string[] = [];

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  // Modal
  selectedDemande: RhDocumentDemande | null = null;

  constructor(private documentsApiService: DocumentsApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // ============================================================
  // Chargement
  // ============================================================

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.documentsApiService.getAllRequests().subscribe({
      next: (data) => {
        this.allDemandes = data;
        this.documentTypes = this.getUniqueDocumentTypes();
        this.applyFilters();
        this.loadKpis();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement:', err);
        this.errorMessage = 'Impossible de charger les demandes.';
        this.isLoading = false;
      }
    });
  }

  loadKpis(): void {
    const total    = this.allDemandes.length;
    const pending  = this.allDemandes.filter(d => d.status === 'pending').length;
    const accepted = this.allDemandes.filter(d => d.status === 'accepted').length;
    const rejected = this.allDemandes.filter(d => d.status === 'rejected').length;

    this.kpiData = [
      { title: 'Total Demandes', value: total,    icon: 'ti ti-list-details', color: 'primary' },
      { title: 'En attente',     value: pending,  icon: 'ti ti-hourglass',    color: 'warning' },
      { title: 'Acceptées',      value: accepted, icon: 'ti ti-check',        color: 'success' },
      { title: 'Refusées',       value: rejected, icon: 'ti ti-x',            color: 'danger'  },
    ];
  }

  // ============================================================
  // Filtres
  // ============================================================

  private getUniqueDocumentTypes(): string[] {
    const types = new Set(this.allDemandes.map(d => d.documentType || d.category));
    return Array.from(types);
  }

  applyFilters(): void {
    let result = [...this.allDemandes];

    if (this.dateRange && this.dateRange.length === 2) {
      const start = new Date(this.dateRange[0]);
      const end   = new Date(this.dateRange[1]);
      result = result.filter(d => {
        const date = new Date(d.requestDate);
        return date >= start && date <= end;
      });
    }

    if (this.selectedType) {
      result = result.filter(d =>
        (d.documentType || d.category) === this.selectedType
      );
    }

    if (this.selectedStatus) {
      result = result.filter(d => d.status === this.selectedStatus);
    }

    if (this.searchText) {
      const term = this.searchText.toLowerCase();
      result = result.filter(d =>
        d.employeeName.toLowerCase().includes(term) ||
        d.documentName.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
      );
    }

    this.filteredDemandes = result;
    this.totalItems = result.length;
    this.currentPage = 1;
  }

  resetFilters(): void {
    this.searchText     = '';
    this.dateRange      = [];
    this.selectedType   = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  getCurrentPageData(): RhDocumentDemande[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDemandes.slice(start, start + this.pageSize);
  }

  onPageChange(page: any): void {
    this.currentPage = page;
  }

  // ============================================================
  // Ouverture modals
  // ============================================================

  onAcceptDemande(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    const modalEl = document.getElementById('acceptDemandModal');
    if (modalEl) {
      new (window as any).bootstrap.Modal(modalEl).show();
    }
  }

  onRefuseDemande(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    const modalEl = document.getElementById('refuseDemandModal');
    if (modalEl) {
      new (window as any).bootstrap.Modal(modalEl).show();
    }
  }

  onViewJustification(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    const modalEl = document.getElementById('demandDetailsModal');
    if (modalEl) {
      new (window as any).bootstrap.Modal(modalEl).show();
    }
  }

  // ============================================================
  // Appels API — approve / reject
  // ============================================================

  // Reçoit { demande, traitement } depuis accept-modal
  confirmApprove(event: any): void {
    const demande = event.demande as RhDocumentDemande;
    const uuid = demande.uuid!;   // ← UUID propre

    this.documentsApiService.approveRequest(uuid).subscribe({
      next: () => {
        this.updateLocalStatus(demande, 'accepted');
      },
      error: (err) => {
        console.error('Erreur approbation:', err);
        alert('Erreur lors de l\'approbation. Veuillez réessayer.');
      }
    });
  }

  // Reçoit { demande, motif } depuis reject-modal
  rejectRequest(event: any): void {
    const demande = event.demande as RhDocumentDemande;
    const uuid = demande.uuid!;   // ← UUID propre

    this.documentsApiService.rejectRequest(uuid).subscribe({
      next: () => {
        this.updateLocalStatus(demande, 'rejected');
      },
      error: (err) => {
        console.error('Erreur rejet:', err);
        alert('Erreur lors du rejet. Veuillez réessayer.');
      }
    });
  }

  // Mise à jour locale sans rechargement
  private updateLocalStatus(
    demande: RhDocumentDemande,
    newStatus: RhDocumentDemande['status']
  ): void {
    const found = this.allDemandes.find(d => d.uuid === demande.uuid);
    if (found) {
      found.status = newStatus;
      found.processedDate = new Date();
    }
    this.applyFilters();
    this.loadKpis();
    this.selectedDemande = null;
  }

  // ============================================================
  // Reset modals
  // ============================================================

  handlleRejectModalClosed(): void {
    this.selectedDemande = null;
  }

  handlleDetailsModalClosed(): void {
    this.selectedDemande = null;
  }
}