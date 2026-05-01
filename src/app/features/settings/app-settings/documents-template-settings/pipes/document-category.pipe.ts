import { Pipe, PipeTransform } from '@angular/core';
import {
  DOCUMENT_CATEGORY_LABEL,
  DocumentCategory,
} from '../enums/document-category.enum';

@Pipe({ name: 'documentCategoryLabel', standalone: true })
export class DocumentCategoryLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return DOCUMENT_CATEGORY_LABEL[value as DocumentCategory] ?? value;
  }
}
