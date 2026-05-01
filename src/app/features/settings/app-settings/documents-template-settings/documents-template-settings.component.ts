import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoryModalComponent } from './modals/select-category-modal/select-category-modal.component';
import { ManageCategoryTemplatesModalComponent } from './modals/manage-category-templates-modal/manage-category-templates-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';
import { DocumentCategory } from './enums/document-category.enum';

@Component({
  selector: 'app-documents-template-settings',
  standalone: true,
  imports: [
    CommonModule,
    SelectCategoryModalComponent,
    ManageCategoryTemplatesModalComponent,
    SwitchButtonComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: './documents-template-settings.component.html',
})
export class DocumentsTemplateSettingsComponent {
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  categories = Object.values(DocumentCategory);
  selectModalOpen = false;
  manageModalOpen = false;
  selectedCategory!: DocumentCategory;

  open(): void {
    this.selectModalOpen = true;
  }

  onCategorySelected(category: DocumentCategory): void {
    this.selectedCategory = category;
    this.selectModalOpen = false;
    this.manageModalOpen = true;
  }

  onSaved(): void {
    this.save.emit();
    this.close.emit();
  }
}
