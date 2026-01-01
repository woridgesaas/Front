import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-personal-info-step',
  templateUrl: './personal-info-step.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule, MatSelectModule]
})
export class PersonalInfoStepComponent {
  @Input() formGroup!: FormGroup;
  selectedFile: File | null = null;

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (file.size > 4 * 1024 * 1024) {
        alert('La taille de l\'image ne doit pas dépasser 4 MB');
        return;
      }
      
      if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
        alert('Seuls les fichiers JPG et PNG sont acceptés');
        return;
      }
      
      this.selectedFile = file;
    }
  }
}