import { Component, OnInit } from '@angular/core';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { CommonModule } from '@angular/common';
import { ChangePasswordService } from '../../../shared/services/changePassword';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ChangePasswordModalComponent, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {

  isModalOpen = false;
showSuccess = false;
 lastPasswordUpdate: Date | null = null;
passwordNeverChanged = false;
onPasswordChanged(date: Date) {
  this.lastPasswordUpdate = date;
  this.showSuccess = true;
this.passwordNeverChanged = false;
console.log("DATE REÇUE:", date);
  this.lastPasswordUpdate = date;
  setTimeout(() => {
    this.showSuccess = false;
  }, 3000);
}
constructor(private changePasswordService: ChangePasswordService) {}
  ngOnInit(): void {
  this.changePasswordService.getLastPasswordUpdate()
    .subscribe({
      next: (res: any) => {
        const date = res?.data?.lastUpdatedPassword;

        if (date) {
          this.lastPasswordUpdate = new Date(date);
          this.passwordNeverChanged = false;
        } else {
          this.passwordNeverChanged = true;
        }
      },
      error: () => {
        this.passwordNeverChanged = true;
      }
    });
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

    this.loadDateFromStorage();
  }
}