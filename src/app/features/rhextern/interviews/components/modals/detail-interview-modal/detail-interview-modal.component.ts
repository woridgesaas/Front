import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Interview,
  getTypeClass,
  getTypeLabel,
  getStatutLabel,
  formatTime
} from '../../../models/interview.model';

@Component({
  selector: 'app-detail-interview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-interview-modal.component.html',
  styleUrls: ['./detail-interview-modal.component.scss']
})
export class DetailInterviewModalComponent {
  @Input() modalId = 'detail_interview_modal';
  @Input() interview: Interview | null = null;
  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }

  formatDate(dateTime: string): string {
    const d = new Date(dateTime);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric'
    });
  }

  formatTime(dateTime: string): string {
    return formatTime(dateTime);
  }

  getTypeLabel(type: any): string { return getTypeLabel(type); }
  getTypeClass(type: any): string { return getTypeClass(type); }
  getStatutLabel(statut: any): string { return getStatutLabel(statut); }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }

  getProgressClass(score: number): string {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  }

  getSkillScores(skillScores: Record<string, number>): { name: string; score: number }[] {
    return Object.entries(skillScores).map(([name, score]) => ({ name, score }));
  }

  getResultLabel(result: string | number): string {
    const labels: Record<string, string> = {
      '0': 'En attente', 'EnAttente': 'En attente',
      '1': 'Retenu',     'Retenu':    'Retenu',
      '2': 'Rejeté',     'Rejete':    'Rejeté'
    };
    return labels[String(result)] || String(result);
  }
  
  getResultClass(result: string | number): string {
    const classes: Record<string, string> = {
      '0': 'bg-secondary', 'EnAttente': 'bg-secondary',
      '1': 'bg-success',   'Retenu':    'bg-success',
      '2': 'bg-danger',    'Rejete':    'bg-danger'
    };
    return classes[String(result)] || 'bg-secondary';
  }
  
  getRecommandationLabel(recommendation: string | number): string {
    const labels: Record<string, string> = {
      '0': '✅ Embaucher',      'Embaucher':         '✅ Embaucher',
      '1': '❌ Refuser',        'Refuser':            '❌ Refuser',
      '2': '🔄 2ème Entretien', 'DeuxiemeEntretien':  '🔄 2ème Entretien'
    };
    return labels[String(recommendation)] || String(recommendation);
  }
  
  getRecommandationClass(recommendation: string | number): string {
    const classes: Record<string, string> = {
      '0': 'text-success fw-semibold', 'Embaucher':        'text-success fw-semibold',
      '1': 'text-danger fw-semibold',  'Refuser':          'text-danger fw-semibold',
      '2': 'text-warning fw-semibold', 'DeuxiemeEntretien':'text-warning fw-semibold'
    };
    return classes[String(recommendation)] || '';
  }

  get interviewerName(): string {
    if (!this.interview?.participants || this.interview.participants.length === 0)
      return '-';
    return this.interview.participants[0]?.userName || '-';
  }

  get interviewerEmail(): string {
    if (!this.interview?.participants || this.interview.participants.length === 0)
      return '-';
    return this.interview.participants[0]?.userEmail || '-';
  }
}