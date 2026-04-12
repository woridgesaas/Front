import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from '../../../../common/modal-header/modal-header.component';
import {
  DocumentsApiService,
  CreateDocumentRequestResponse
} from '../../../../../shared/services/documents-api.service';

interface DocumentTemplateUi {
  category: string;
  name: string;
  description: string;
  group: string;
}

@Component({
  selector: 'app-demande-document-modal',
  standalone: true,
  imports: [MatSelectModule, CommonModule, FormsModule, ModalHeaderComponent],
  templateUrl: './demande-document-modal.component.html',
  styleUrl: './demande-document-modal.component.scss',
})
export class DemandeDocumentModalComponent {

  @Input() documentTemplates: DocumentTemplateUi[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() demandCreated = new EventEmitter<CreateDocumentRequestResponse>();

  selectedCategory = '';
  submitting = false;
  searchTerm = '';

  constructor(private api: DocumentsApiService) {}

  get selectedDocument(): DocumentTemplateUi | undefined {
    return this.documentTemplates.find(doc => doc.category === this.selectedCategory);
  }

  get documentGroups(): string[] {
    const groups = new Set(this.filteredDocuments.map(doc => doc.group));
    return Array.from(groups);
  }

  get filteredDocuments(): DocumentTemplateUi[] {
    if (!this.searchTerm) return this.documentTemplates;

    const term = this.searchTerm.toLowerCase();
    return this.documentTemplates.filter(doc =>
      doc.name.toLowerCase().includes(term) ||
      doc.description.toLowerCase().includes(term) ||
      doc.category.toLowerCase().includes(term) ||
      doc.group.toLowerCase().includes(term)
    );
  }

  getDocumentsByGroup(group: string): DocumentTemplateUi[] {
    return this.filteredDocuments.filter(doc => doc.group === group);
  }

  submitDemand(form: NgForm): void {
    if (form.invalid || !this.selectedCategory) return;

    this.submitting = true;

    this.api.createDocumentRequest(this.selectedCategory).subscribe({
      next: (res) => {
        this.demandCreated.emit(res);
        this.resetForm(form);
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.submitting = false;
      }
    });
  }

  resetForm(form?: NgForm): void {
    this.selectedCategory = '';
    this.searchTerm = '';

    if (form) form.resetForm();
  }
}