import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { DocumentDemande, RhDocumentDemande } from '../../../../shared/models/models';
import { DocumentsService } from '../../../../shared/services/documents-service';
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
  imports: [DetailsModalComponent,AcceptModalComponent, RejectModalComponent,BreadcrumbsComponent,DocumentsKpisComponent,BsDatepickerModule,CommonModule,FormsModule,DocumentsListComponent,CustomPaginationComponent],
  templateUrl: './validate-administrativ-documents.component.html',
  styleUrl: './validate-administrativ-documents.component.scss',
})
export class ValidateAdministrativDocumentsComponent {
   // Data
  allDemandes: RhDocumentDemande[] = [];
  filteredDemandes: RhDocumentDemande[] = [];
  kpiData:any=[];
  // Filtres
  searchText: string = '';
  dateRange: Date[] = [];
  selectedType: string = '';
  selectedStatus: string = '';
  selectedUrgency: string = '';
  
  // Liste des filtres disponibles
  documentTypes: string[] = [];
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  // Modal
  selectedDemande: RhDocumentDemande | null = null;
  showAcceptModal:boolean=false;
  showRejectModal:boolean=false;
  showDetailsModal:boolean=false;
  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.loadData();
    this.loadKpisFromService();
  }

  // data render
  loadData(): void {
    this.allDemandes = this.documentsService.getAllDocumentsForRH();
    this.documentTypes = this.getUniqueDocumentTypes();
    this.applyFilters();
  }
  //kpis render
  loadKpisFromService():any{
    this.kpiData = this.documentsService.getAllStatistics();
  }
  
  private getUniqueDocumentTypes(): string[] {
    const types = new Set(this.allDemandes.map(d => d.documentType || d.category));
    return Array.from(types);
  }

  // Filters
  applyFilters(): void {
    let result = [...this.allDemandes];

    // Filtre par période
    if (this.dateRange && this.dateRange.length === 2) {
      const start = new Date(this.dateRange[0]);
      const end = new Date(this.dateRange[1]);
      result = result.filter(d => {
        const date = new Date(d.requestDate);
        return date >= start && date <= end;
      });
    }

    // Filtre par type
    if (this.selectedType) {
      result = result.filter(d => (d.documentType || d.category) === this.selectedType);
    }

    // Filtre par statut
    if (this.selectedStatus) {
      result = result.filter(d => d.status === this.selectedStatus);
    }

    // Filtre par urgence
    if (this.selectedUrgency) {
      result = result.filter(d => d.urgency === this.selectedUrgency);
    }

    // Filtre par recherche
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
    this.searchText = '';
    this.dateRange = [];
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedUrgency = '';
    this.applyFilters();
  }
  getCurrentPageData(): RhDocumentDemande[] {
    return this.filteredDemandes;
  }

  // Changer de page
  onPageChange(page: any): void {
    this.currentPage = page;
  }
  /** ============================= events emited ============================ */
  //open accept request modal go
  onAcceptDemande(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    this.showAcceptModal=true;
    const modalEl = document.getElementById("acceptDemandModal");
    if(modalEl){
      const modal = new(window as any).bootstrap.Modal(modalEl);
      modal.show();

    }
  }
  //open refuse modal go
  onRefuseDemande(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    this.showRejectModal =true;
    const modalEl = document.getElementById("refuseDemandModal");
    if(modalEl){
      const modal = new(window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
  //child send data after rejected succefully
  rejectRequest(event:any):void{
    alert("Emited succefuly request rejected iwth raison : "+event.motif.raison);
  }
  //refresh selectedDemande after reject
  handlleRejectModalClosed():void{
    this.selectedDemande =null;
  }
  //open details model go
  onViewJustification(demande: RhDocumentDemande): void {
    this.selectedDemande = demande;
    this.showDetailsModal=true;
     const modalEl = document.getElementById("demandDetailsModal");
    if(modalEl){
      const modal = new(window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }
  //reset selectedRequest after closed modal
  public handlleDetailsModalClosed():void{
    this.selectedDemande=null;
  }
  // Helpers pour l'affichage
  getStatusText(status: string): string {
    const map: Record<string, string> = {
      'pending': 'En attente',
      'in_progress': 'En traitement',
      'ready': 'Prêt',
      'accepted': 'Acceptée',
      'rejected': 'Refusée',
      'cancelled': 'Annulée'
    };
    return map[status] || status;
  }

  getUrgencyText(urgency: string): string {
    const map: Record<string, string> = {
      'high': 'Urgent',
      'medium': 'Moyen',
      'low': 'Faible'
    };
    return map[urgency] || urgency;
  }

  // Pour le calcul d'affichage
  getDisplayRangeStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getDisplayRangeEnd(): number {
    const end = this.currentPage * this.pageSize;
    return Math.min(end, this.totalItems);
  }
}
