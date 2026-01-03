import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { DocumentDemande } from '../../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-documents-list',
  imports: [MatSortModule,CommonModule,FormsModule],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss',
})
export class DocumentsListComponent {
   @Input() data: DocumentDemande[] = [];
  @Output() viewDetails = new EventEmitter<DocumentDemande>();
  @Output() download = new EventEmitter<DocumentDemande>();
  @Output() cancel = new EventEmitter<DocumentDemande>();
  @Output() delete = new EventEmitter<DocumentDemande>();
  @Output() selectionChange = new EventEmitter<DocumentDemande[]>();
  initChecked =false;
   sortData(event: any): void {
    const { active, direction } = event;
    if (!active || direction === '') return;

    this.data.sort((a, b) => {
      let aValue, bValue;

      switch (active) {
        case 'documentName':
          aValue = a.documentName.toLowerCase();
          bValue = b.documentName.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'requestDate':
          aValue = new Date(a.requestDate).getTime();
          bValue = new Date(b.requestDate).getTime();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'processedDate':
          aValue = a.processedDate ? new Date(a.processedDate).getTime() : 0;
          bValue = b.processedDate ? new Date(b.processedDate).getTime() : 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Select all
  selectAll(): void {
    this.data.forEach((item) => {
      item.isSelected = this.initChecked;
    });
    this.emitSelection();
  }

  //One row selected
  onCheckboxChange(): void {
    this.emitSelection();
  }

  private emitSelection(): void {
    const selected = this.data.filter(item => item.isSelected);
    this.selectionChange.emit(selected);
  }

  // Helpers simples
  getStatusText(status: string): string {
    const map: any = {
      'pending': 'En attente',
      'in_progress': 'En traitement',
      'ready': 'Prêt',
      'rejected': 'Rejeté',
      'cancelled': 'Annulé'
    };
    return map[status] || status;
  }

  getStatusBadgeClass(status: string): string {
    const map: any = {
      'pending': 'bg-warning-subtle text-warning border-warning',
      'in_progress': 'bg-info-subtle text-info border-info',
      'ready': 'bg-success-subtle text-success border-success',
      'rejected': 'bg-danger-subtle text-danger border-danger',
      'cancelled': 'bg-secondary-subtle text-secondary border-secondary'
    };
    return map[status] || 'bg-light text-dark border';
  }

  // Actions emitions
  onViewDetails(item: DocumentDemande): void {
    this.viewDetails.emit(item);
  }

  onDownload(item: DocumentDemande): void {
    this.download.emit(item);
  }

  onCancel(item: DocumentDemande): void {
    this.cancel.emit(item);
  }

  onDelete(item: DocumentDemande): void {
    this.delete.emit(item);
  }
}
