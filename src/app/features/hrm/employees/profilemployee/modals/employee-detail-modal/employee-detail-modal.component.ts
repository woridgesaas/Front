import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEmployeeModalComponent } from '../../../employees-list/modals/edit-employee-modal/edit-employee-modal.component';
import { EmployeeProfileResponse } from '../../../../models/user/employee-profile.model';

@Component({
  selector: 'app-employee-detail-modal',
  standalone: true,
  templateUrl: './employee-detail-modal.component.html',
  imports: [CommonModule, EditEmployeeModalComponent],
})
export class EmployeeDetailModalComponent {
  @Input() employee: EmployeeProfileResponse | null = null;
}
