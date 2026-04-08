import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interview, UpdateInterviewDto } from '../../../models/interview.model';

@Component({
  selector: 'app-edit-interview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-interview-modal.component.html',
  styleUrls: ['./edit-interview-modal.component.scss']
})
export class EditInterviewModalComponent implements OnChanges {
  @Input() modalId = 'edit_interview_modal';
  @Input() interview: Interview | null = null;
  @Output() onUpdate = new EventEmitter<Interview>();
  @Output() onCancel = new EventEmitter<void>();

  // Champs du formulaire
  date            = '';
  heure           = '';
  durationMinutes = 60;
  type            = 0;
  videoConferenceLink = '';
  location            = '';
  phoneNumber         = '';
  notes               = '';

  // Quand l'input interview change, on remplit le formulaire
  ngOnChanges(): void {
    if (this.interview) {
      const dt = new Date(this.interview.startDateTime);
      this.date  = dt.toISOString().split('T')[0];
      this.heure = dt.toTimeString().slice(0, 5);

      this.durationMinutes    = this.interview.durationMinutes;
      this.type               = this.getTypeValue(this.interview.type);
      this.videoConferenceLink = this.interview.videoConferenceLink || '';
      this.location           = this.interview.location || '';
      this.phoneNumber        = this.interview.phoneNumber || '';
      this.notes              = this.interview.notes || '';
    }
  }

  update(): void {
    if (!this.interview) return;

    // On émet l'Interview mis à jour
    const updated: Interview = {
      ...this.interview,
      startDateTime:      `${this.date}T${this.heure}:00`,
      durationMinutes:    this.durationMinutes,
      type:               this.getTypeLabel(this.type),
      videoConferenceLink: this.type === 0 ? this.videoConferenceLink : undefined,
      location:           this.type === 1 ? this.location : undefined,
      phoneNumber:        this.type === 2 ? this.phoneNumber : undefined,
      notes:              this.notes
    };

    this.onUpdate.emit(updated);
  }

  cancel(): void {
    this.onCancel.emit();
  }

  private getTypeValue(type: string): number {
    const values: Record<string, number> = {
      'Visioconference': 0,
      'Presentiel':      1,
      'Telephonique':    2
    };
    return values[type] ?? 0;
  }

  private getTypeLabel(type: number): any {
    const labels: Record<number, string> = {
      0: 'Visioconference',
      1: 'Presentiel',
      2: 'Telephonique'
    };
    return labels[type] ?? 'Visioconference';
  }
}