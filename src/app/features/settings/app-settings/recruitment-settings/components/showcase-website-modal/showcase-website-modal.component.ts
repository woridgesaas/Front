import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { ShowcaseWebsiteSettings } from '../../../../../../shared/models/showcase.model';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-showcase-website-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    AlertInformationComponent,
  ],
  templateUrl: './showcase-website-modal.component.html',
  styleUrl: './showcase-website-modal.component.scss',
})
export class ShowcaseWebsiteModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  //* Form model
  form: ShowcaseWebsiteSettings = {
    description: '',
    primaryColor: '#A631D8',
    secondaryColor: '#C8A5F3',
    logoFile: null,
  };

  //* File handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.form.logoFile = input.files[0];
    }
  }

  //* Submit form
  submit(): void {
    console.log('Showcase form data:', this.form);

    //todo call backend

    this.close.emit();
  }
}
