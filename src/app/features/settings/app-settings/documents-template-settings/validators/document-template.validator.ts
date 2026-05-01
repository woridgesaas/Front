export const DOCUMENT_TEMPLATE_MAX_SIZE_MB = 10;
export const DOCUMENT_TEMPLATE_MAX_SIZE_BYTES =
  DOCUMENT_TEMPLATE_MAX_SIZE_MB * 1024 * 1024;
export const DOCUMENT_TEMPLATE_ALLOWED_EXTENSION = '.pdf';
export const DOCUMENT_TEMPLATE_ALLOWED_CONTENT_TYPE = 'application/pdf';

export interface DocumentTemplateValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateDocumentTemplateFile(file: File,): DocumentTemplateValidationResult {
  if (file.size > DOCUMENT_TEMPLATE_MAX_SIZE_BYTES) {
    return {
      valid: false,
      error: `Le fichier dépasse la taille maximale autorisée de ${DOCUMENT_TEMPLATE_MAX_SIZE_MB} Mo`,
    };
  }

  if (file.type !== DOCUMENT_TEMPLATE_ALLOWED_CONTENT_TYPE) {
    return {
      valid: false,
      error: 'Le fichier doit être au format PDF (application/pdf)',
    };
  }

  if (!file.name.toLowerCase().endsWith(DOCUMENT_TEMPLATE_ALLOWED_EXTENSION)) {
    return {
      valid: false,
      error: "Le fichier doit avoir l'extension .pdf",
    };
  }

  return { valid: true, error: null };
}
