import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BsDatepickerModule, 
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  // Form data model
  employeeData = {
    firstName: '',
    lastName: '',
    endDate: '',
    cin: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    profileImage: null as File | null
  };

  // Date picker configuration
  bsConfig = {
    adaptivePosition: true,
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default'
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.size <= 4 * 1024 * 1024) { // 4MB limit
      this.employeeData.profileImage = file;
    } else {
      alert('L\'image doit être inférieure à 4 Mo');
    }
  }

  onSubmit() {
    console.log('Employee data:', this.employeeData);
    // Add your API call here
  }

  onCancel() {
    // Reset form
    this.employeeData = {
      firstName: '',
      lastName: '',
      endDate: '',
      cin: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      profileImage: null
    };
  }
}