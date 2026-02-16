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
import { department } from '../../../../../../shared/models/models';
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

  @Input() open = false;                 // ✅ comme Add
  @Input() department!: department;
  @Output() update = new EventEmitter<department>();
  @Output() cancel = new EventEmitter<void>();

  model!: department;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['department'] && this.department) {
      this.model = { ...this.department };
    }
  }

  onCancel() {
    this.cancel.emit();                  // le parent met open = false
  }

  submit() {
    this.update.emit(this.model);
    this.onCancel();                     // ferme le modal
  }
}
