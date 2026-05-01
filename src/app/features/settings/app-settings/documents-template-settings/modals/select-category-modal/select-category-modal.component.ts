import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { DocumentCategoryLabelPipe } from '../../pipes/document-category.pipe';
import { DocumentCategory } from '../../enums/document-category.enum';

@Component({
  selector: 'app-select-category-modal',
  standalone: true,
  imports: [CommonModule, ModalHeaderComponent, DocumentCategoryLabelPipe],
  templateUrl: './select-category-modal.component.html',
})
export class SelectCategoryModalComponent {
  @Input() open = false;
  @Input() categories: DocumentCategory[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<DocumentCategory>();

  trackByCategory(_: number, category: DocumentCategory): DocumentCategory {
    return category;
  }

  onSelect(category: DocumentCategory): void {
    this.select.emit(category);
  }
}
