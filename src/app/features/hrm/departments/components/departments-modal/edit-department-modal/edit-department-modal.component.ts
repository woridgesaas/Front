import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../../../../shared/models/models';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';

@Component({
  selector: 'app-edit-department-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalFooterComponent,
    ModalHeaderComponent,
  ],
  templateUrl: './edit-department-modal.component.html',
})
export class EditDepartmentModalComponent implements OnChanges {

  @Input() open = false;
  @Input() department!: Department;

@Output() update = new EventEmitter<{
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
}>();
  @Output() cancel = new EventEmitter<void>();

  model = {
  id: '',
  name: '',
  status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
};

  ngOnChanges(changes: SimpleChanges) {
  if (changes['department'] && this.department) {
    this.model = {
      id: this.department.id,
      name: this.department.name,
      status: this.department.status
    };
  }
}

  onCancel() {
    this.cancel.emit();
  }

  submit() {
  if (!this.model.name.trim()) return;

  this.update.emit({
    id: this.model.id,
    name: this.model.name.trim(),
    status: this.model.status
  });

  this.onCancel();
}

    

}