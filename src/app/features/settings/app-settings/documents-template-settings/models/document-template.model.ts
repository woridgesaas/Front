import { DocumentCategory } from '../enums/document-category.enum';

export interface DocumentTemplate {
  code: string;
  name: string;
  description: string;
  category: DocumentCategory;
  file: File | null;
  uploadedId?: string | null;
  previewUrl?: string | null;
  isDeleting?: boolean;
}

export interface UploadDocumentTemplatesResponse {
  id: string;
  category: DocumentCategory;
  previewUrl: string;
}

export interface PreviewDocumentTemplateResponse {
  previewUrl: string;
}
