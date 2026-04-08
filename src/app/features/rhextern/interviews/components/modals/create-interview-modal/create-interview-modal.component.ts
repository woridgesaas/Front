import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateInterviewDto } from '../../../models/interview.model';
import { Interviewer } from '../../../models/interviewer.model';

@Component({
  selector: 'app-create-interview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-interview-modal.component.html',
  styleUrls: ['./create-interview-modal.component.scss']
})
export class CreateInterviewModalComponent implements OnInit {
  @Input() modalId = 'create_interview_modal';
  @Input() interviewers: Interviewer[] = [];
  @Output() onCreate = new EventEmitter<CreateInterviewDto>();
  @Output() onCancel = new EventEmitter<void>();

  candidateName       = '';
  candidateEmail      = '';
  candidatePhone      = '';
  targetPosition      = '';
  interviewerId       = 0;
  interviewerName     = '';
  interviewerEmail    = '';
  date                = '';
  heure               = '';
  durationMinutes     = 60;
  type                = 0;
  videoConferenceLink = '';
  location            = '';
  phoneNumber         = '';
  notes               = '';

  ngOnInit(): void {
    this.reset();
  }

  onInterviewerSelect(id: string): void {
    const selected = this.interviewers.find(i => i.id === +id);
    if (selected) {
      this.interviewerId    = selected.id;
      this.interviewerName  = selected.nom;
      this.interviewerEmail = selected.email;
    }
  }

  create(): void {
    const startDateTime = `${this.date}T${this.heure}:00`;
  
    const dto: CreateInterviewDto = {
      candidateName:       this.candidateName,
      candidateEmail:      this.candidateEmail,
      candidatePhone:      this.candidatePhone || undefined,
      targetPosition:      this.targetPosition || undefined,
      startDateTime:       startDateTime,
      durationMinutes:     Number(this.durationMinutes), // ← cast
      type:                Number(this.type),            // ← cast
      videoConferenceLink: this.type == 0 ? this.videoConferenceLink : undefined,
      location:            this.type == 1 ? this.location : undefined,
      phoneNumber:         this.type == 2 ? this.phoneNumber : undefined,
      notes:               this.notes || undefined,
      interviewerId:       Number(this.interviewerId),   // ← cast
      interviewerName:     this.interviewerName,
      interviewerEmail:    this.interviewerEmail
    };
  
    this.onCreate.emit(dto);
    this.reset();
  }
  cancel(): void {
    this.reset();
    this.onCancel.emit();
  }

  private reset(): void {
    this.candidateName       = '';
    this.candidateEmail      = '';
    this.candidatePhone      = '';
    this.targetPosition      = '';
    this.interviewerId       = 0;
    this.interviewerName     = '';
    this.interviewerEmail    = '';
    this.date                = '';
    this.heure               = '';
    this.durationMinutes     = 60;
    this.type                = 0;
    this.videoConferenceLink = '';
    this.location            = '';
    this.phoneNumber         = '';
    this.notes               = '';
  }
}