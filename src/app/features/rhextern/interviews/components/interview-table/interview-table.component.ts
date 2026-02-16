
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interview, getStatutClass, getTypeClass, formatDateShort } from '../../models/interview.model';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';

@Component({
  selector: 'app-interview-table',
  standalone: true,
  imports: [CommonModule, ConfirmDeleteComponent],
  templateUrl: './interview-table.component.html',
  styleUrls: ['./interview-table.component.scss']
})
export class InterviewTableComponent {
  @Input() interviews: Interview[] = [];
  @Output() onView = new EventEmitter<Interview>();
  @Output() onEdit = new EventEmitter<Interview>();
  @Output() onDelete = new EventEmitter<Interview>();
  @Output() onCancel = new EventEmitter<Interview>();
  @Output() onStatusChange = new EventEmitter<{ interview: Interview; status: string }>();
  
  selectedItem: Interview | null = null;

  /**
   * Voir les détails
   */
  viewDetails(interview: Interview): void {
    this.onView.emit(interview);
  }

  /**
   * Modifier
   */
  edit(interview: Interview): void {
    this.onEdit.emit(interview);
  }

  /**
   * Ouvrir le modal de suppression
   */
  openDeleteModal(interview: Interview): void {
    this.selectedItem = interview;
  }

  /**
   * Confirmer la suppression
   */
  confirmDelete(interview: Interview): void {
    this.onDelete.emit(interview);
    this.selectedItem = null;
  }
  
  /**
   * Annuler
   */
  cancel(interview: Interview): void {
    this.onCancel.emit(interview);
  }

  /**
   * Changer le statut
   */
  changeStatus(interview: Interview, status: string): void {
    this.onStatusChange.emit({ interview, status });
  }

  /**
   * Formater la date
   */
  formatDate(date: string): string {
    return formatDateShort(date);
  }

  /**
   * Classe CSS du statut
   */
  getStatutClass(statut: any): string {
    return getStatutClass(statut);
  }

  /**
   * Classe CSS du type
   */
  getTypeClass(type: any): string {
    return getTypeClass(type);
  }
}