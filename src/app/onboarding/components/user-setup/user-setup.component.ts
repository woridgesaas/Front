import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OnboardingCardComponent } from '../onboarding-card/onboarding-card.component';
import { AddEmployeeComponent } from '../../../features/hrm/employees/employees-list/modals/add-employee/add-employee.component';
import { OnboardingService } from '../../services/onboarding.service';
import { Role } from '../../../features/hrm/models/role.enum';

@Component({
  selector: 'app-user-setup',
  standalone: true,
  imports: [CommonModule, AddEmployeeComponent, OnboardingCardComponent],
  templateUrl: './user-setup.component.html',
})
export class UserSetupComponent implements OnInit, OnDestroy {
  @Input({ required: true }) role!: Role;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) buttonText!: string;
  @Input({ required: true }) buttonIcon!: string;

  @Output() completed = new EventEmitter<void>();

  private sub!: Subscription;

  constructor(private onboarding: OnboardingService) {}

  ngOnInit(): void {
    this.sub = this.onboarding.employeeCreated$.subscribe(() => {
      this.completed.emit();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openModal(): void {
    const modalEl = document.getElementById('add_employee');
    if (!modalEl) return;
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }
}
