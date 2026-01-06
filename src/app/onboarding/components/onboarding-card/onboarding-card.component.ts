import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-card.component.html',
  styleUrl: './onboarding-card.component.scss',
})
export class OnboardingCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
}
