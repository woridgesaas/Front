import { Component, OnInit } from '@angular/core';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ChangePasswordModalComponent, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {

  isModalOpen = false;

  lastPasswordUpdate: Date | null = null;

  ngOnInit(): void {
    this.loadDateFromStorage();
  }

  loadDateFromStorage(): void {
    const saved = localStorage.getItem("lastPasswordUpdate");

    if (saved) {
      this.lastPasswordUpdate = new Date(saved);
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;

    // 🔥 Recharge la date après fermeture modal
    this.loadDateFromStorage();
  }
}