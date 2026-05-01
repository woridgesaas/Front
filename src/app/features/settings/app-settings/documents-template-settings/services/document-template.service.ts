import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentCategory } from '../enums/document-category.enum';
import {
  PreviewDocumentTemplateResponse,
  UploadDocumentTemplatesResponse,
} from '../models/document-template.model';
import { ApiResponse } from '../../../../../shared/models/api-response.models';

@Injectable({ providedIn: 'root' })
export class DocumentTemplateService {
  private readonly BASE_URL = `${process.env['NG_APP_GATEWAY_URL']}/api/settings/document-templates`;

  constructor(private http: HttpClient) {}

  uploadTemplates(items: { category: DocumentCategory; file: File }[],): Observable<UploadDocumentTemplatesResponse[]> {
    const formData = new FormData();
    items.forEach((item, index) => {
      formData.append(
        `documentTemplateItems[${index}].category`,
        item.category,
      );
      formData.append(
        `documentTemplateItems[${index}].documentTemplate`,
        item.file,
      );
    });
    return this.http
      .post<ApiResponse<UploadDocumentTemplatesResponse[]>>(this.BASE_URL, formData)
      .pipe(map((r) => r.data));
  }

  previewTemplate(id: string): Observable<PreviewDocumentTemplateResponse> {
    return this.http
      .get<ApiResponse<PreviewDocumentTemplateResponse>>(`${this.BASE_URL}/${id}`)
      .pipe(map((r) => r.data));
  }

  deleteTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
