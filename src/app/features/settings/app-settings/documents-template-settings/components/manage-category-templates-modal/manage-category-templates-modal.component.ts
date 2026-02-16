import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCategory } from '../../../../../../shared/enum/document-category.enum';
import { DocumentTemplate } from '../../../../../../shared/models/document-template.model';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';

@Component({
  selector: 'app-manage-category-templates-modal',
  standalone: true,
  imports: [CommonModule, ModalHeaderComponent, ModalFooterComponent],
  templateUrl: './manage-category-templates-modal.component.html',
  styleUrls: ['./manage-category-templates-modal.component.scss'],
})
export class ManageCategoryTemplatesModalComponent {
  @Input() open = false;
  @Input() category!: DocumentCategory;
  @Input() templates: DocumentTemplate[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<{ code: string; file: File }>();

  trackByCode(_: number, document: DocumentTemplate): string {
    return document.code;
  }

  onFileSelected(event: Event, document: DocumentTemplate): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileSelected.emit({
      code: document.code,
      file,
    });

    input.value = '';
  }
}
