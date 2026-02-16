import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RhDocumentDemande } from '../../../../../../shared/models/models';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents-list',
  imports: [MatSortModule,FormsModule,CommonModule,MatSort],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
  @Input() data: RhDocumentDemande[] = [];
  @Output() accept = new EventEmitter<RhDocumentDemande>();
  @Output() refuse = new EventEmitter<RhDocumentDemande>();
  @Output() viewJustification = new EventEmitter<RhDocumentDemande>();
  // Tri colones
  getSortValue(item: RhDocumentDemande, column: string): any {
     switch (column) {
       case 'employeeName': return item.employeeName?.toLowerCase() || ''; 
       case 'requestDate': return new Date(item.requestDate).getTime(); 
       case 'documentType': return (item.documentType || item.category || '').toLowerCase(); 
       case 'status': return item.status || ''; default: return ''; 
      } 
  }
sortData(event: any): void {
  const { active, direction } = event;
  
  if (!active || direction === '') return;

  // 1. Crée une NOUVELLE copie du tableau
  const sortedData = [...this.data];
  
  // 2. Trie la copie
  this.data.sort((a, b) => {
    const aValue = this.getSortValue(a, active);
    const bValue = this.getSortValue(b, active);
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  
}

  
  canTakeAction(demande: RhDocumentDemande): boolean {
    return demande.status === 'pending' || demande.status === 'in_progress';
  }

  // Helper
  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'En attente',
      'in_progress': 'En traitement',
      'ready': 'Prêt',
      'accepted': 'Acceptée',
      'rejected': 'Refusée',
      'cancelled': 'Annulée'
    };
    return statusMap[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const classMap: Record<string, string> = {
      'pending': 'badge-warning',
      'in_progress': 'badge-info',
      'ready': 'badge-primary',
      'accepted': 'badge-success',
      'rejected': 'badge-danger',
      'cancelled': 'badge-secondary'
    };
    return classMap[status] || 'badge-secondary';
  }

  // Emiter les action to parent
  onAccept(demande: RhDocumentDemande): void {
    this.accept.emit(demande);
  }

  onRefuse(demande: RhDocumentDemande): void {
    this.refuse.emit(demande);
  }

  onViewJustification(demande: RhDocumentDemande): void {
    this.viewJustification.emit(demande);
  }
}
