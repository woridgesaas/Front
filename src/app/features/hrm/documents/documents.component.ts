import { Component, OnDestroy } from '@angular/core';
import { DocumentTemplateService } from '../../../shared/services/document-template.service';
import { CustomPaginationComponent } from '../../../shared/custom-pagination/custom-pagination.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { breadCrumbItems } from '../../../shared/models/models';
import {  MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

interface DocumentDemande {
  id: string;                     
  documentCode: string;          
  documentName: string;
  description: string;           
  category: string;            
  requestDate: Date;            
  processedDate?: Date;           
  status: 'completed' | 'in_progress' | 'pending' | 'rejected' | 'ready';                          
  notes?: string; 
  isSelected?: boolean;
  sNo?: number;
}

@Component({
  selector: 'app-documents',
  imports: [
    CustomPaginationComponent,
    FormsModule, 
    CommonModule,
    MatSelectModule,
    BreadcrumbsComponent,
    MatSortModule
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnDestroy {
  initChecked = false;
  
  // pagination variables
  public pageSize = 10;
  public tableData: DocumentDemande[] = [];
  public tableDataCopy: DocumentDemande[] = [];
  public actualData: DocumentDemande[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public searchDataValue = '';
  
  dataSource!: MatTableDataSource<DocumentDemande>;
  
  breadCrumbItems: breadCrumbItems[] = [
    { label: 'Employe', active: false },
    { label: 'Documents', active: false },
    { label: 'Mes demandes', active: true }
  ];
  
  // Filtres
  filterStatus: string = '';
  filterCategory: string = '';
  categories: string[] = [];
  
  isOpen = false;
  
  constructor(
    private documentsService: DocumentTemplateService,
  ) {}
  
  ngOnDestroy(): void {
    this.isOpen = false;
  }
  
  ngOnInit(): void {
    this.loadDemandes();
  }
  
  loadDemandes(): void {
    // Donéne mocjked statiqument
    this.actualData = [
      {
        id: '1',
        documentCode: 'ATTESTATION_TRAVAIL',
        documentName: 'Attestation de travail',
        description: 'Document attestant que vous êtes employé dans l\'entreprise',
        category: 'Attestations',
        requestDate: new Date('2024-01-15'),
        processedDate: new Date('2024-01-16'),
        status: 'completed',
      },
      {
        id: '3',
        documentCode: 'ATTESTATION_SALAIRE',
        documentName: 'Attestation de salaire',
        description: 'Document précisant votre rémunération',
        category: 'Attestations',
        requestDate: new Date('2024-01-10'),
        processedDate: new Date('2024-01-12'),
        status: 'pending',
      },
      {
        id: '5',
        documentCode: 'CERTIFICAT_TRAVAIL',
        documentName: 'Certificat de travail',
        description: 'Document obligatoire remis à la fin du contrat',
        category: 'Attestations',
        requestDate: new Date('2024-01-05'),
        processedDate: new Date('2024-01-07'),
        status: 'completed',
      },
      {
        id: '6',
        documentCode: 'DECISION_PROMOTION',
        documentName: 'Décision de promotion',
        description: 'Acte officialisant votre évolution professionnelle',
        category: 'Documents internes RH',
        requestDate: new Date('2024-01-22'),
        processedDate: undefined,
        status: 'rejected',
        notes: 'Demande incomplète'
      }
    ];
    
    this.calculateCategories();
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
  
  private getTableData(pageOption: any): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.actualData.length;
    

    let filteredData = this.applyFiltersToData(this.actualData);
    
    filteredData.forEach((res: DocumentDemande, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.sNo = serialNumber;
        this.tableData.push(res);
        this.tableDataCopy.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<DocumentDemande>(this.tableData);
  }
  
  private applyFiltersToData(data: DocumentDemande[]): DocumentDemande[] {
    let result = [...data];
    
    
    if (this.filterStatus) {
      result = result.filter(d => d.status === this.filterStatus);
    }
    
   
    if (this.filterCategory) {
      result = result.filter(d => d.category === this.filterCategory);
    }
    
    // Filtre par recherche
    if (this.searchDataValue) {
      const term = this.searchDataValue.toLowerCase();
      result = result.filter(d => 
        d.documentName.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term)
      );
    }
    
    return result;
  }
  
  calculateCategories(): void {
    const uniqueCategories = new Set(this.actualData.map(d => d.category));
    this.categories = Array.from(uniqueCategories);
  }
  
  //   recherche 
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
  
  // methods de trie decolones 
  public sortData(sort: Sort) {
    alert(sort.active)
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        
        
        if (sort.active === 'date' || sort.active === 'processed') {
          const dateA = sort.active === 'date' ? a.requestDate : (a.processedDate || new Date(0));
          const dateB = sort.active === 'date' ? b.requestDate : (b.processedDate || new Date(0));
          return (dateA.getTime() - dateB.getTime()) * (sort.direction === 'asc' ? 1 : -1);
        }
        
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  
 
  public changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
  

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  

  applyStatusFilter(status: string): void {
    this.filterStatus = status;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
  
  applyCategoryFilter(category: string): void {
    this.filterCategory = category;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
  

  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En traitement';
      case 'ready': return 'Prêt';
      case 'completed': return 'Terminé';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  }
  
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'in_progress': return 'badge-info';
      case 'ready': return 'badge-success';
      case 'completed': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }
  
  // Actions
  openNewDemandModal(): void {
    this.isOpen = !this.isOpen;
  }
  
  viewDetails(demande: DocumentDemande): void {
    alert('Voir détails:'+ demande);
  }
  
  downloadDocument(demande: DocumentDemande): void {
    alert("downloaded :)")
  }
  
  cancelDemande(demande: DocumentDemande): void {
    alert('Annuler demande:'+demande.id);
  }
  
  deleteDemande(demande: DocumentDemande): void {
    if (confirm(`Supprimer la demande "${demande.documentName}" ?`)) {
      alert('Supprimer demande:'+ demande.id);
    }
  }
  
  onPageChange(event: any): void {
    this.skip = (event.page - 1) * this.pageSize;
    this.currentPage = event.page;
    this.getTableData({ skip: this.skip, limit: this.limit });
  }
}