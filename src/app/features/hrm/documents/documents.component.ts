import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSortModule } from '@angular/material/sort';
import { DemandeDocumentModalComponent } from './components/request-document-modal/demande-document-modal.component';
import { CancelModalComponent } from '../../common/cancel-modal/cancel-modal.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { KpisComponent } from '../../common/kpis/kpis.component';
import { ToastService } from '../../../shared/services/toast.service';
import { DocumentDemande } from './models/document-request.model';
import {
  DocumentsApiService,
  DocumentTypeResponse,
} from '../../../shared/services/documents-api.service';
import { DocumentService } from './Services/document.service';

interface DocumentTemplateUi {
  category: string;
  name: string;
  description: string;
  group: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CancelModalComponent,
    CustomPaginationComponent,
    FormsModule,
    CommonModule,
    MatSelectModule,
    BreadcrumbsComponent,
    MatSortModule,
    DemandeDocumentModalComponent,
    DocumentsListComponent,
    ConfirmDeleteComponent,
    KpisComponent,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  public actualData: DocumentDemande[] = [];
  public tableData: DocumentDemande[] = [];
  public itemToBeDeleted: DocumentDemande | null = null;

  public pageSize = 10;
  public currentPage = 1;
  public skip = 0;
  public totalData = 0;

  public searchDataValue = '';
  public filterStatus = '';
  public filterCategory = '';
  public categories: string[] = [];

  public selectedDemande: DocumentDemande | null = null;
  public documentTemplates: DocumentTemplateUi[] = [];

  constructor(
    private documentService: DocumentService,
    private api: DocumentsApiService,
    private toast: ToastService
  ) {}

  // ── KPIs — alignés sur l'enum backend ────────────────────────────────────
  get totalDemandes(): number { return this.actualData.length; }
  get pendingDemandes(): number {
    return this.actualData.filter((d) => d.status === 'PENDING').length;
  }
  get readyDemandes(): number {
    return this.actualData.filter((d) => d.status === 'APPROVED').length;
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadDemandes();
  }

  // ── Chargement données ────────────────────────────────────────────────────
  loadDemandes(): void {
    this.documentService.getMyRequests().subscribe({
      next: (data) => {
        this.actualData = data;
        this.updateTableData();
      },
      error: () => {
        this.toast.error('Impossible de charger les demandes.');
      },
    });
  }

  // ── Modal nouvelle demande ────────────────────────────────────────────────
  openNewDemandModal(): void {
    this.api.getDocumentTypes().subscribe({
      next: (types: DocumentTypeResponse[]) => {
        this.documentTemplates = types.map((doc) => ({
          category: doc.category,
          name: this.formatLabel(doc.category),
          description: doc.description,
          group: doc.group,
        }));
      },
      error: () => {
        this.toast.error('Impossible de charger les types de documents.');
      },
    });
  }

  onDemandeCreated(): void {
    this.loadDemandes();
    this.closeModal();
    this.toast.success('Demande créée avec succès.');
  }

  // ── Actions tableau ───────────────────────────────────────────────────────
  viewDetails(demande: DocumentDemande): void {
    console.log('Détails:', demande);
  }

  // ✅ Appel réel au backend — télécharge le PDF depuis MinIO via le gateway
  downloadDocument(demande: DocumentDemande): void {
    if (!demande.downloadable) return;
    this.documentService.downloadDocument(demande.id, demande.documentName);
    this.toast.success(`Téléchargement de "${demande.documentName}" lancé.`);
  }

  openCancelModal(demande: DocumentDemande): void {
    const modalEl = document.getElementById('cancelDemandeModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
      this.selectedDemande = demande;
    }
  }

  cancelDemande(): void {
    if (!this.selectedDemande) return;
    const index = this.actualData.findIndex(
      (d) => d.id === this.selectedDemande!.id
    );
    if (index !== -1) {
      this.actualData[index].status = 'REJECTED';
      this.updateTableData();
    }
    this.selectedDemande = null;
    this.toast.warning('Demande annulée.');
  }

  showDeleteModal(demande: DocumentDemande): void {
    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
    this.itemToBeDeleted = demande;
  }

  deleteDemande(): void {
    this.actualData = this.actualData.filter(
      (d) => d.id !== this.itemToBeDeleted?.id
    );
    this.updateTableData();
    this.toast.success('Demande supprimée.');
  }

  // ── Filtres & pagination ──────────────────────────────────────────────────
  applyStatusFilter(status: string): void {
    this.filterStatus = status;
    this.currentPage = 1;
    this.updateTableData();
  }

  applyCategoryFilter(category: string): void {
    this.filterCategory = category;
    this.currentPage = 1;
    this.updateTableData();
  }

  searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.currentPage = 1;
    this.updateTableData();
  }

  resetFilters(): void {
    this.filterStatus = '';
    this.filterCategory = '';
    this.searchDataValue = '';
    this.currentPage = 1;
    this.updateTableData();
  }

  updateTableData(): void {
    let filtered = [...this.actualData];

    if (this.filterStatus) {
      filtered = filtered.filter((d) => d.status === this.filterStatus);
    }
    if (this.filterCategory) {
      filtered = filtered.filter((d) => d.category === this.filterCategory);
    }
    if (this.searchDataValue) {
      const term = this.searchDataValue;
      filtered = filtered.filter(
        (d) =>
          d.documentName.toLowerCase().includes(term) ||
          d.category.toLowerCase().includes(term)
      );
    }

    this.totalData = filtered.length;
    this.calculateCategories();

    const start = (this.currentPage - 1) * this.pageSize;
    this.tableData = filtered.slice(start, start + this.pageSize);
  }

  onPageChange(page: any): void {
    this.currentPage = Number(page);
    this.skip = (this.currentPage - 1) * this.pageSize;
    this.updateTableData();
  }

  changePageSize(size: number): void {
    this.pageSize = Number(size);
    this.currentPage = 1;
    this.updateTableData();
  }

  calculateCategories(): void {
    this.categories = [...new Set(this.actualData.map((d) => d.category))];
  }

  // ── Status helpers (utilisés dans documents.component.html) ──────────────
  getStatusText(status: string): string {
    const map: Record<string, string> = {
      PENDING:  'En attente',
      APPROVED: 'Approuvé',
      REJECTED: 'Rejeté',
    };
    return map[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:  'bg-warning-subtle text-warning border-warning',
      APPROVED: 'bg-success-subtle text-success border-success',
      REJECTED: 'bg-danger-subtle text-danger border-danger',
    };
    return map[status] || 'bg-light text-dark border';
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  closeModal(): void {
    const modalEl = document.getElementById('newDocumentDemand');
    if (modalEl) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modalEl).hide();
    }
  }

  private formatLabel(value: string | undefined): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
