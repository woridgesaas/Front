
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interview, CandidatInfo, InterviewerInfo } from '../../../models/interview.model';
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
  @Input() interview: Partial<Interview> = {};

  @Output() onCreate = new EventEmitter<Partial<Interview>>();
  @Output() onCancel = new EventEmitter<void>();

  // Initialisés pour éviter les erreurs undefined
  candidat: CandidatInfo = {
    nom: '',
    email: '',
    poste: '',
    photo: 'default-avatar.jpg',
    telephone: ''
  };

  interviewer: InterviewerInfo = {
    nom: '',
    email: '',
    photo: 'default-avatar.jpg'
  };

  date = '';
  heure = '';
  duree = 60;
  type: 'Téléphonique' | 'Visioconférence' | 'Présentiel' | 'Technique' = 'Visioconférence';
  lienVisio = '';
  salle = '';
  notes = '';

  ngOnInit(): void {
    // Initialiser avec les données du parent si elles existent
    if (this.interview) {
      this.candidat = this.interview.candidat || this.candidat;
      this.interviewer = this.interview.interviewer || this.interviewer;
      this.date = this.interview.date || '';
      this.heure = this.interview.heure || '';
      this.duree = this.interview.duree || 60;
      this.type = this.interview.type || 'Visioconférence';
      this.lienVisio = this.interview.lienVisio || '';
      this.salle = this.interview.salle || '';
      this.notes = this.interview.notes || '';
    }
  }

  create(): void {
    const newInterview: Partial<Interview> = {
      candidat: this.candidat,
      interviewer: this.interviewer,
      date: this.date,
      heure: this.heure,
      duree: this.duree,
      type: this.type,
      lienVisio: this.lienVisio,
      salle: this.salle,
      notes: this.notes
    };

    this.onCreate.emit(newInterview);
    this.reset();
  }

  cancel(): void {
    this.reset();
    this.onCancel.emit();
  }

  private reset(): void {
    this.candidat = {
      nom: '',
      email: '',
      poste: '',
      photo: 'default-avatar.jpg',
      telephone: ''
    };
    this.interviewer = {
      nom: '',
      email: '',
      photo: 'default-avatar.jpg'
    };
    this.date = '';
    this.heure = '';
    this.duree = 60;
    this.type = 'Visioconférence';
    this.lienVisio = '';
    this.salle = '';
    this.notes = '';
  }
}