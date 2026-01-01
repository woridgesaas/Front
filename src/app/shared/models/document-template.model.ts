import { DocumentCategory } from '../enum/document-category.enum';

export interface DocumentTemplate {
  code: string;
  name: string;
  description: string;
  category: DocumentCategory;
  file: File | null;
}
