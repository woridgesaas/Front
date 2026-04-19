// DTO reçu depuis GET api/documents/requests/documents
export interface DocumentRequestResponse {
  id: string;
  documentName: string;
  category: string;
  requestDate: string;
  status: DocumentStatus;
  processingDate: string | null;
  downloadable: boolean;
}

// Aligné sur l'enum Java : RequestStatus { PENDING, APPROVED, REJECTED }
export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Modèle UI utilisé dans le composant et le tableau
export interface DocumentDemande {
  id: string;
  documentName: string;
  category: string;
  requestDate: Date;
  processingDate: Date | null;
  status: DocumentStatus;
  downloadable: boolean;
  isSelected?: boolean;
}
