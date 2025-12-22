import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTemplate } from '../../../../shared/models/document-template.model';
import { DocumentTemplateService } from '../../../../shared/services/document-template.service';

@Component({
  selector: 'app-documents-template-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents-template-settings.component.html',
  styleUrls: ['./documents-template-settings.component.scss'],
})
export class DocumentsTemplateSettingsComponent {
  documentTypes: DocumentTemplate[] = [];

  constructor(private documentTemplateService: DocumentTemplateService) {
    this.documentTypes = this.documentTemplateService.getDocumentTemplates();
  }

  onFileSelected(event: any, doc: DocumentTemplate): void {
    const file = event.target.files[0];
    if (file) {
      this.documentTemplateService.updateTemplateFile(doc.code, file);
    }
  }

  showCategories: Record<string, boolean> = {};

  toggleCategory(category: string): void {
    this.showCategories[category] = !this.showCategories[category];
  }

  saveTemplates(): void {
    this.documentTemplateService.saveTemplates();
    alert('Modèles de documents sauvegardés avec succès');
  }
}
