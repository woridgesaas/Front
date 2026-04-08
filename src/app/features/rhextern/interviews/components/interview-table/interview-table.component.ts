import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Interview,
  InterviewStatut,
  getStatutClass,
  getStatutLabel,
  getTypeClass,
  getTypeLabel,
  formatDateShort,
  formatTime
} from '../../models/interview.model';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-interview-table',
  standalone: true,
  imports: [CommonModule, ConfirmDeleteComponent],
  templateUrl: './interview-table.component.html',
  styleUrls: ['./interview-table.component.scss']
})
export class InterviewTableComponent {
  @Input() interviews: Interview[] = [];
  @Output() onView         = new EventEmitter<Interview>();
  @Output() onEdit         = new EventEmitter<Interview>();
  @Output() onDelete       = new EventEmitter<Interview>();
  @Output() onCancel       = new EventEmitter<Interview>();
  @Output() onStatusChange = new EventEmitter<{ interview: Interview; status: string }>();
  @Output() onEvaluate     = new EventEmitter<Interview>();

  selectedItem: Interview | null = null;

  constructor(private authService: AuthService) {}

  // ========== PERMISSIONS ==========

  get canManage(): boolean {
    return this.authService.canManageInterviews();
  }

  get canEvaluate(): boolean {
    return this.authService.canEvaluate();
  }

  get canChangeStatus(): boolean {
    return this.authService.canChangeStatus();
  }

  // ========== ACTIONS ==========

  viewDetails(interview: Interview): void {
    this.onView.emit(interview);
  }

  edit(interview: Interview): void {
    this.onEdit.emit(interview);
  }

  openDeleteModal(interview: Interview): void {
    this.selectedItem = interview;
  }

  confirmDelete(interview: Interview): void {
    this.onDelete.emit(interview);
    this.selectedItem = null;
  }

  cancel(interview: Interview): void {
    this.onCancel.emit(interview);
  }

  changeStatus(interview: Interview, status: string): void {
    this.onStatusChange.emit({ interview, status });
  }

  evaluate(interview: Interview): void {
    this.onEvaluate.emit(interview);
  }

  // ========== HELPERS ==========

  formatDate(dateTime: string): string {
    return formatDateShort(dateTime);
  }

  formatTime(dateTime: string): string {
    return formatTime(dateTime);
  }

  getStatutLabel(statut: any): string {
    return getStatutLabel(statut as InterviewStatut);
  }

  getStatutClass(statut: any): string {
    return getStatutClass(statut as InterviewStatut);
  }

  getTypeLabel(type: any): string {
    return getTypeLabel(type);
  }

  getTypeClass(type: any): string {
    return getTypeClass(type);
  }

  getInterviewerName(interview: Interview): string {
    if (!interview.participants || interview.participants.length === 0)
      return '-';
    return interview.participants[0]?.userName || '-';
  }
}