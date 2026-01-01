import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { DepositionChannelForm } from '../../../../../../shared/models/deposition-channel.model';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-deposition-channel-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    AlertInformationComponent,
  ],
  templateUrl: './deposition-channel-modal.component.html',
  styleUrl: './deposition-channel-modal.component.scss',
})
export class DepositionChannelModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  //* Form model
  form: DepositionChannelForm = {
    recruitmentEmail: '',
  };

  //* Submit form
  submit(): void {
    console.log('Deposition channel form:', this.form);

    //todo call backend

    this.close.emit();
  }
}
