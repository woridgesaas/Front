import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { department } from '../../../../../../shared/models/models';

@Component({
  selector: 'app-add-department-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './add-department-modal.component.html',
})
export class AddDepartmentModalComponent {

  @Output() add = new EventEmitter<department>();

  model: department = {
    Department: '',
    NoOfEmployees: 0,
    Status: 'Actif',
    isSelected: false,
    id: Date.now(),
  };

  submit() {
  this.add.emit(this.model);

  this.model = {
    id: Date.now(),
    Department: '',
    NoOfEmployees: 0,
    Status: 'Actif',
    isSelected: false,
  };
}

}
