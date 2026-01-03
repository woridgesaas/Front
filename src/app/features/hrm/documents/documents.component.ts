import { Component, OnDestroy } from '@angular/core';
import { DocumentTemplateService } from '../../../shared/services/document-template.service';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeDocumentModalComponent } from './components/request-document-modal/demande-document-modal.component';
import { DocumentTemplate } from '../../../shared/models/document-template.model';
import { CancelModalComponent } from '../../common/cancel-modal/cancel-modal.component';
import { DocumentDemande } from '../../../shared/models/models';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { DocumentsService } from '../../../shared/services/documents-service';
import { ConfirmDeleteComponent } from '../../common/delete-modal/delete-modal.component';


@Component({
  selector: 'app-documents',
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
    ConfirmDeleteComponent
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent{

    // Data
  public actualData: DocumentDemande[] = [];
  public tableData: DocumentDemande[] = [];
  public itemToBeDeleted:DocumentDemande | null =null;
  // Pagination
  public pageSize = 10;
  public currentPage = 1;
  public skip = 0;
  public totalData = 0;
  
  // Filters
  public searchDataValue = '';
  public filterStatus: string = '';
  public filterCategory: string = '';
  public categories: string[] = [];
  
  // Modal
  public selectedDemande: DocumentDemande | null = null;
  public actionType: 'cancel' | 'delete' = 'cancel';
  public documentTemplates: any[] = [];

  constructor(
    private documentsService: DocumentTemplateService,
    private employeDocService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.loadDemandes();
  }
  loadDemandes(): void {
    this.actualData = this.employeDocService.getDocumentsByEmploye();
    this.calculateCategories();
    this.updateTableData();
  }
  calculateCategories(): void {
    const uniqueCategories = new Set(this.actualData.map(d => d.category));
    this.categories = Array.from(uniqueCategories);
  }

  updateTableData(): void {
    // Appliquer les filtres
    let filteredData = this.actualData;
    
    if (this.filterStatus) {
      filteredData = filteredData.filter(d => d.status === this.filterStatus);
    }
    
    if (this.filterCategory) {
      filteredData = filteredData.filter(d => d.category === this.filterCategory);
    }
    
    if (this.searchDataValue) {
      const term = this.searchDataValue.toLowerCase();
      filteredData = filteredData.filter(d =>
        d.documentName.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term)
      );
    }
    
    this.totalData = filteredData.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.tableData = filteredData.slice(startIndex, endIndex);
  }

  // Filtres
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

  // Recherche
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

  // Modal actions
  openNewDemandModal(): void {
    this.documentTemplates = this.documentsService.getDocumentTemplates();
    
  }

  closeModal(): void {
    const modalEl = document.getElementById("newDocumentDemand");
    if(modalEl){
      const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();

    }
  }


  viewDetails(demande: DocumentDemande): void {
   alert('Voir détails:'+demande.category);
  }

  downloadDocument(demande: DocumentDemande): void {
   alert('Télécharger:'+demande.documentName);
    
  }

  openCancelModal(demande: any): void {
    const modalEl = document.getElementById("cancelDemandeModal");
    if(modalEl){
      const modal = new(window as any).bootstrap.Modal(modalEl);
      modal.show();
      this.selectedDemande = demande;
      this.actionType = 'cancel';
    }
  }

  cancelDemande(event:any): void {
    if (!this.selectedDemande) return;
    
    const index = this.actualData.findIndex(d => d.id === this.selectedDemande!.id);
    if (index !== -1) {
      this.actualData[index].status = 'rejected';
      this.updateTableData();
    }
    this.selectedDemande = null;
  }
  public showDeleteModal(demande:DocumentDemande):void{
    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
    this.itemToBeDeleted = demande;
    
  }
  deleteDemande(): void {
    
      this.actualData = this.actualData.filter(d => d.id !== this.itemToBeDeleted?.id);
      this.updateTableData();
    
  }

  // Pagination
  onPageChange(page: any): void {
    this.currentPage = page;
    this.skip = (page - 1) * this.pageSize;
    this.updateTableData();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.updateTableData();
  }

  // Helpers
  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'in_progress': 'En traitement',
      'ready': 'Prêt',
      'completed': 'Terminé',
      'rejected': 'Rejeté'
    };
    return statusMap[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classMap: Record<string, string> = {
      'pending': 'badge-warning',
      'in_progress': 'badge-info',
      'ready': 'badge-success',
      'completed': 'badge-success',
      'rejected': 'badge-danger'
    };
    return classMap[status] || 'badge-secondary';
  }

  // Callback 
  onDemandeCreated(newDemande: any): void {
    // add
    alert(newDemande.documentCode)
    
    this.updateTableData();
    this.closeModal();
  }
}
