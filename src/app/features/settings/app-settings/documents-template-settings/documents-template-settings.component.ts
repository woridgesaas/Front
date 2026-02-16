import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoryModalComponent } from './components/select-category-modal/select-category-modal.component';
import { ManageCategoryTemplatesModalComponent } from './components/manage-category-templates-modal/manage-category-templates-modal.component';
import { DocumentCategory } from '../../../../shared/enum/document-category.enum';
import { DocumentTemplate } from '../../../../shared/models/document-template.model';
import { DocumentTemplateService } from '../../../../shared/services/document-template.service';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';

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
  templates: DocumentTemplate[] = [];

  selectModalOpen = false;
  manageModalOpen = false;
  selectedCategory!: DocumentCategory;

  constructor(private service: DocumentTemplateService) {
    this.templates = this.service.getDocumentTemplates();
  }

  open(): void {
    this.selectModalOpen = true;
  }

  onCategorySelected(category: DocumentCategory): void {
    this.selectedCategory = category;
    this.selectModalOpen = false;
    this.manageModalOpen = true;
  }

  get filteredTemplates(): DocumentTemplate[] {
    return this.templates.filter((t) => t.category === this.selectedCategory);
  }

  onFileSelected(e: { code: string; file: File }) {
    this.service.updateTemplateFile(e.code, e.file);
  }

  saveTemplates(): void {
    this.service.saveTemplates();

    //* Notify onboarding that document is configured
    this.save.emit();

    //* Close settings view
    this.close.emit();
  }
}
