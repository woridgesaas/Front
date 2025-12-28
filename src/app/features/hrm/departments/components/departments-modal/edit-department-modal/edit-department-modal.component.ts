import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { department } from '../../../../../../shared/models/models';

@Component({
  selector: 'app-edit-department-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-department-modal.component.html',
})
export class EditDepartmentModalComponent {
  @Input() department!: department;
  @Output() update = new EventEmitter<department>();

  model!: department;

  ngOnChanges() {
    if (this.department) {
      this.model = { ...this.department };
    }
  }

  submit() {
    this.update.emit(this.model);
  }
}
