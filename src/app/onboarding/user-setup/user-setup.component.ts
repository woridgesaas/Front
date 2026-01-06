import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from '../enum/user-role.enum';
import { UserSetupModalComponent } from '../components/user-setup-modal/user-setup-modal.component';
import { OnboardingCardComponent } from '../components/onboarding-card/onboarding-card.component';

@Component({
  selector: 'app-user-setup',
  standalone: true,
  imports: [CommonModule, UserSetupModalComponent, OnboardingCardComponent],
  templateUrl: './user-setup.component.html',
  styleUrl: './user-setup.component.scss',
})
export class UserSetupComponent {
  @Input({ required: true }) role!: UserRole;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) buttonIcon!: string;

  @Output() completed = new EventEmitter<void>();

  onSaved(): void {
    this.completed.emit();
  }
}
