import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';

@Component({
  selector: 'app-add-department-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalFooterComponent,
    ModalHeaderComponent,
  ],
  templateUrl: './add-department-modal.component.html',
})
export class AddDepartmentModalComponent {

  @Input() open = false;
@Output() add = new EventEmitter<{ name: string; status: string }>();
 @Output() cancel = new EventEmitter<void>();

  model = {
    name: '',
    status: ''
  };

  onCancel() {
    this.cancel.emit();
    this.reset();
  }

  submit() {
  if (!this.model.name.trim() || !this.model.status) return;

  this.add.emit({
    name: this.model.name.trim(),
    status: this.model.status
  });

  this.onCancel();
}

 private reset() {
  this.model = {
    name: '',
    status: ''
  };
}
}