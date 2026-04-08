import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interview } from '../../../../models/interview.model';
import { CreateEvaluationDto } from '../../../../models/interview.model';

@Component({
  selector: 'app-evaluate-interview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluate-interview-modal.component.html',
  styleUrls: ['./evaluate-interview-modal.component.scss']
})
export class EvaluateInterviewModalComponent implements OnChanges {
  @Input() modalId = 'evaluate_interview_modal';
  @Input() interview: Interview | null = null;
  @Output() onSubmit = new EventEmitter<CreateEvaluationDto>();
  @Output() onClose  = new EventEmitter<void>();

  // Résultat global
  result = 0; // 0=EnAttente, 1=Retenu, 2=Rejete

  // Notes par compétence (0-100)
  skillScores = {
    Technique:      0,
    Communication:  0,
    Motivation:     0,
    Comportement:   0
  };

  // Commentaire et recommandation
  comment        = '';
  recommendation: number | null = null; // 0=Embaucher, 1=Refuser, 2=DeuxiemeEntretien

  ngOnChanges(): void {
    if (this.interview) {
      this.reset();
    }
  }

  submit(): void {
    const dto: CreateEvaluationDto = {
      result:         this.result,
      skillScores:    this.skillScores,
      comment:        this.comment || undefined,
      recommendation: this.recommendation ?? undefined
    };
    this.onSubmit.emit(dto);
    this.reset();
  }

  close(): void {
    this.reset();
    this.onClose.emit();
  }

  // Score moyen calculé automatiquement
  get averageScore(): number {
    const scores = Object.values(this.skillScores);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  // Couleur selon le score
  getScoreColor(score: number): string {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }

  private reset(): void {
    this.result         = 0;
    this.skillScores    = {
      Technique:     0,
      Communication: 0,
      Motivation:    0,
      Comportement:  0
    };
    this.comment        = '';
    this.recommendation = null;
  }
}