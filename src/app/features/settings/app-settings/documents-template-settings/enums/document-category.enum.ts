export enum DocumentCategory {
  ATTESTATION = 'ATTESTATION',
  CONTRACT = 'CONTRACT',
  DISCIPLINARY = 'DISCIPLINARY',
  INTERNSHIP = 'INTERNSHIP',
  POLICY = 'POLICY',
}

export const DOCUMENT_CATEGORY_LABEL: Record<DocumentCategory, string> = {
  [DocumentCategory.ATTESTATION]: 'Attestations',
  [DocumentCategory.CONTRACT]: 'Contrats',
  [DocumentCategory.DISCIPLINARY]: 'Discipline',
  [DocumentCategory.INTERNSHIP]: 'Stages et formation',
  [DocumentCategory.POLICY]: 'Documents internes RH',
};
