import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentDemande } from '../../models/document-request.model';

@Component({
  selector: 'app-documents-list',
  imports: [MatSortModule, CommonModule, FormsModule],
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

  initChecked = false;

  sortData(event: any): void {
    const { active, direction } = event;
    if (!active || direction === '') return;

    this.data.sort((a, b) => {
      let aValue: any, bValue: any;

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
        case 'processingDate':
          aValue = a.processingDate ? new Date(a.processingDate).getTime() : 0;
          bValue = b.processingDate ? new Date(b.processingDate).getTime() : 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onCheckboxChange(): void {
    this.emitSelection();
  }

  private emitSelection(): void {
    const selected = this.data.filter((item) => item.isSelected);
    this.selectionChange.emit(selected);
  }

  // Aligné sur l'enum Java : RequestStatus { PENDING, APPROVED, REJECTED }
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

  onViewDetails(item: DocumentDemande): void { this.viewDetails.emit(item); }
  onDownload(item: DocumentDemande): void    { this.download.emit(item); }
  onCancel(item: DocumentDemande): void      { this.cancel.emit(item); }
  onDelete(item: DocumentDemande): void      { this.delete.emit(item); }
}
