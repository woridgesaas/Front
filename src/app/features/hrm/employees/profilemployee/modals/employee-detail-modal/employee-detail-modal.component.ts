import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-employee-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './employee-detail-modal.component.html',
  styleUrls: ['./employee-detail-modal.component.scss'],
})
export class EmployeeDetailModalComponent {
  employee = {
    firstName: '',
    lastName: '',
    cin: '',
    email: '',
    phone: '',
    endDate: null as Date | null,
    image: null as File | null,
  };

  // upload image
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.employee.image = input.files[0];
    }
  }

  // submit form
  onSubmit(): void {
    console.log('Employee updated:', this.employee);

    // TODO:
    // appeler service API
    // fermer modal
  }

  // reset / cancel
  onCancel(): void {
    // reset logic si besoin
  }
}
