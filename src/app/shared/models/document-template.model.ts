export type DocumentCategory =
  | 'Contrats'
  | 'Attestations'
  | 'Fin de contrat'
  | 'Discipline'
  | 'Stages & formation'
  | 'Documents internes RH';

export interface DocumentTemplate {
  code: string;
  name: string;
  description: string;
  category: DocumentCategory;
  file: File | null;
}
