import { Component } from '@angular/core';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ChangePasswordModalComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
