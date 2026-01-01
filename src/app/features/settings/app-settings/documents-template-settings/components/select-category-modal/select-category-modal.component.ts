import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCategory } from '../../../../../../shared/enum/document-category.enum';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';

@Component({
  selector: 'app-select-category-modal',
  standalone: true,
  imports: [CommonModule, ModalHeaderComponent],
  templateUrl: './select-category-modal.component.html',
  styleUrls: ['./select-category-modal.component.scss'],
})
export class SelectCategoryModalComponent {
  @Input() open = false;
  @Input() categories: DocumentCategory[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<DocumentCategory>();

  trackByCategory(_index: number, category: DocumentCategory): DocumentCategory {
    return category;
  }

  //* Emit selected category
  onSelect(category: DocumentCategory): void {
    this.select.emit(category);
  }
}
