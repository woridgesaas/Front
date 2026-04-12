import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSortModule } from '@angular/material/sort';
import { DemandeDocumentModalComponent } from './components/request-document-modal/demande-document-modal.component';
import { CancelModalComponent } from '../../common/cancel-modal/cancel-modal.component';
import { DocumentDemande } from '../../../shared/models/models';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';
import {
  DocumentsApiService,
  DocumentTypeResponse,
  CreateDocumentRequestResponse,
} from '../../../shared/services/documents-api.service';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { KpisComponent } from "../../common/kpis/kpis.component";

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
    KpisComponent
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
  public actionType: 'cancel' | 'delete' = 'cancel';

  public documentTemplates: DocumentTemplateUi[] = [];

  constructor(private api: DocumentsApiService) {}
get totalDemandes() {
  return this.actualData.length;
}

get pendingDemandes() {
  return this.actualData.filter(d => d.status === 'pending').length;
}

get readyDemandes() {
  return this.actualData.filter(d => d.status === 'ready').length;
}
  ngOnInit(): void {
  this.loadDemandes();
}
loadDemandes(): void {
  this.api.getMyRequests().subscribe({
    next: (data) => {

      this.actualData = data.map(d => ({
  id: d.id,
  documentCode: d.documentCode,

  documentName: this.formatCategoryLabel(d.documentCode),

  description: '',

  category: d.documentCode, // 👈 utiliser documentCode

  requestDate: new Date(d.requestDate),

  status: d.status.toLowerCase() as any
}));

      this.updateTableData();
    },
    error: (err) => {
      console.error(err);
    }
  });
}
  openNewDemandModal(): void {
    this.api.getDocumentTypes().subscribe({
      next: (types: DocumentTypeResponse[]) => {
        this.documentTemplates = types.map((doc) => ({
          category: doc.category,
          name: this.formatCategoryLabel(doc.category),
          description: doc.description,
          group: doc.group,
        }));
      },
      error: (err) => {
        console.error('Erreur chargement types documents:', err);
      },
    });
  }

  private formatCategoryLabel(category: string | undefined): string {
  if (!category) return '';

  return category
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  calculateCategories(): void {
    const uniqueCategories = new Set(this.actualData.map((d) => d.category));
    this.categories = Array.from(uniqueCategories);
  }

  updateTableData(): void {
    let filteredData = [...this.actualData];

    if (this.filterStatus) {
      filteredData = filteredData.filter((d) => d.status === this.filterStatus);
    }

    if (this.filterCategory) {
      filteredData = filteredData.filter(
        (d) => d.category === this.filterCategory,
      );
    }

    if (this.searchDataValue) {
      const term = this.searchDataValue.toLowerCase();
      filteredData = filteredData.filter(
        (d) =>
          d.documentName.toLowerCase().includes(term) ||
          d.description.toLowerCase().includes(term) ||
          d.category.toLowerCase().includes(term),
      );
    }

    this.totalData = filteredData.length;
    this.calculateCategories();

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.tableData = filteredData.slice(startIndex, endIndex);
  }

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

  closeModal(): void {
    const modalEl = document.getElementById('newDocumentDemand');
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getOrCreateInstance(
        modalEl,
      );
      modal.hide();
    }
  }

  viewDetails(demande: DocumentDemande): void {
    alert('Voir détails: ' + demande.category);
  }

  downloadDocument(demande: DocumentDemande): void {
    alert('Télécharger: ' + demande.documentName);
  }

  openCancelModal(demande: DocumentDemande): void {
    const modalEl = document.getElementById('cancelDemandeModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
      this.selectedDemande = demande;
      this.actionType = 'cancel';
    }
  }

  cancelDemande(): void {
    if (!this.selectedDemande) return;

    const index = this.actualData.findIndex(
      (d) => d.id === this.selectedDemande!.id,
    );
    if (index !== -1) {
      this.actualData[index].status = 'rejected';
      this.updateTableData();
    }

    this.selectedDemande = null;
  }

  public showDeleteModal(demande: DocumentDemande): void {
    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
    this.itemToBeDeleted = demande;
  }

  deleteDemande(): void {
    this.actualData = this.actualData.filter(
      (d) => d.id !== this.itemToBeDeleted?.id,
    );
    this.updateTableData();
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

  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      pending: 'En attente',
      in_progress: 'En traitement',
      ready: 'Prêt',
      completed: 'Terminé',
      rejected: 'Rejeté',
    };
    return statusMap[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classMap: Record<string, string> = {
      pending: 'badge-warning',
      in_progress: 'badge-info',
      ready: 'badge-success',
      completed: 'badge-success',
      rejected: 'badge-danger',
    };
    return classMap[status] || 'badge-secondary';
  }

  onDemandeCreated(): void {
  this.loadDemandes(); 
  this.closeModal();
}
}
