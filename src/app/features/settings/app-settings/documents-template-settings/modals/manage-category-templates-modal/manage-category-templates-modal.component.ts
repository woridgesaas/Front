import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import {
  DOCUMENT_CATEGORY_LABEL,
  DocumentCategory,
} from '../../enums/document-category.enum';
import { DocumentTemplate } from '../../models/document-template.model';
import { DocumentTemplateDataService } from '../../services/document-template-data.service';
import { DocumentTemplateService } from '../../services/document-template.service';
import { validateDocumentTemplateFile } from '../../validators/document-template.validator';
import { ApiErrorHandler } from '../../../../../../shared/utils/api-error-handler.utils';

@Component({
  selector: 'app-manage-category-templates-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './manage-category-templates-modal.component.html',
})
export class ManageCategoryTemplatesModalComponent implements OnChanges {
  @Input() open = false;
  @Input() category!: DocumentCategory;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  templates: DocumentTemplate[] = [];
  loading = false;
  previewLoadingId: string | null = null;
  fileErrors: Record<string, string> = {};

  constructor(
    private dataService: DocumentTemplateDataService,
    private httpService: DocumentTemplateService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true && this.category) {
      this.loading = false;
      this.previewLoadingId = null;
      this.fileErrors = {};
      this.templates = this.dataService.getByCategory(this.category);
    }
  }

  get categoryLabel(): string {
    return DOCUMENT_CATEGORY_LABEL[this.category] ?? this.category;
  }

  trackByCode(_: number, doc: DocumentTemplate): string {
    return doc.code;
  }

  //* File selection
  onFileSelected(event: Event, doc: DocumentTemplate): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';

    if (!file) return;

    const result = validateDocumentTemplateFile(file);

    if (!result.valid) {
      this.fileErrors[doc.code] = result.error!;
      return;
    }

    delete this.fileErrors[doc.code];
    this.dataService.setFile(doc.code, file);
    this.templates = this.dataService.getByCategory(this.category);
  }

  //* Preview
  onPreview(doc: DocumentTemplate): void {
    if (!doc.uploadedId) return;
    this.previewLoadingId = doc.uploadedId;
    this.httpService.previewTemplate(doc.uploadedId).subscribe({
      next: (res) => {
        this.previewLoadingId = null;
        window.open(res.previewUrl, '_blank');
      },
      error: (err: HttpErrorResponse) => {
        this.previewLoadingId = null;
        ApiErrorHandler.handle(err, this.toastr);
      },
    });
  }

  //* Delete
  onDelete(doc: DocumentTemplate): void {
    if (!doc.uploadedId) return;

    doc.isDeleting = true;
    this.httpService.deleteTemplate(doc.uploadedId).subscribe({
      next: () => {
        this.dataService.clearUploaded(doc.code);
        this.templates = this.dataService.getByCategory(this.category);
        this.toastr.success('Modèle supprimé avec succès');
      },
      error: (err: HttpErrorResponse) => {
        doc.isDeleting = false;
        ApiErrorHandler.handle(err, this.toastr);
      },
    });
  }

  get pendingTemplates(): DocumentTemplate[] {
    return this.templates.filter((t) => t.file && !t.uploadedId);
  }

  get hasFileErrors(): boolean {
    return Object.keys(this.fileErrors).length > 0;
  }

  get isInvalid(): boolean {
    return (
      this.hasFileErrors ||
      (this.pendingTemplates.length === 0 &&
        this.templates.every((t) => !t.uploadedId))
    );
  }

  submit(): void {
    if (this.loading || this.isInvalid) return;

    const toUpload = this.pendingTemplates;
    if (toUpload.length === 0) {
      this.saved.emit();
      this.close.emit();
      return;
    }

    this.loading = true;
    const items = toUpload.map((t) => ({
      category: this.category,
      file: t.file as File,
    }));

    this.httpService.uploadTemplates(items).subscribe({
      next: (responses) => {
        responses.forEach((res, index) => {
          this.dataService.setUploaded(
            toUpload[index].code,
            res.id,
            res.previewUrl,
          );
        });
        this.templates = this.dataService.getByCategory(this.category);
        this.loading = false;
        this.toastr.success('Modèles configurés avec succès');
        this.saved.emit();
        this.close.emit();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        ApiErrorHandler.handle(err, this.toastr);
      },
    });
  }
}
