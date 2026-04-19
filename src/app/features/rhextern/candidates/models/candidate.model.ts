export interface Candidate {
  id: number;
  applicationName: string;
  candidateEmail: string;
  candidatePhone: string;
  detectedCategory: string;
  status: CandidateStatus;
  cvStorageUrl: string;
  createdAt: string;
  isSelected?: boolean;
  // Détail modal uniquement (GET /api/candidates/{id})
  location?: string;
  aiScore?: number;
  histories?: HistoryEntry[];
}

export interface HistoryEntry {
  actionType: string;
  actionDescription: string;
  statusBefore: string;
  statusAfter: string;
  actionDate: string;
}

export interface CandidateDetailResponse extends Candidate {
  location: string;
  aiScore: number;
  histories: HistoryEntry[];
}

// Valeurs = strings français exacts renvoyés par le backend
export enum CandidateStatus {
  NEW        = 'Nouveau',
  SCHEDULED  = 'Entretien Planifié',
  INTERVIEWED= 'Interviewé',
  OFFERED    = 'Offre Envoyée',
  HIRED      = 'Embauché',
  REJECTED   = 'Refusé'
}

export interface CandidateApiResponse {
  data: Candidate[];
  totalData: number;
}

export const STATUS_CONFIG: Record<CandidateStatus, {
  badge: string;
  icon: string;
  iconColor: string;
  label: string;
}> = {
  [CandidateStatus.NEW]: {
    badge: 'border-purple text-purple',
    icon: 'ti-star',
    iconColor: 'text-purple',
    label: 'Nouveau'
  },
  [CandidateStatus.SCHEDULED]: {
    badge: 'border-pink text-pink',
    icon: 'ti-calendar',
    iconColor: 'text-pink',
    label: 'Entretien Planifié'
  },
  [CandidateStatus.INTERVIEWED]: {
    badge: 'border-info text-info',
    icon: 'ti-user-check',
    iconColor: 'text-info',
    label: 'Interviewé'
  },
  [CandidateStatus.OFFERED]: {
    badge: 'border-warning text-warning',
    icon: 'ti-mail',
    iconColor: 'text-warning',
    label: 'Offre Envoyée'
  },
  [CandidateStatus.HIRED]: {
    badge: 'border-success text-success',
    icon: 'ti-circle-check',
    iconColor: 'text-success',
    label: 'Embauché'
  },
  [CandidateStatus.REJECTED]: {
    badge: 'border-danger text-danger',
    icon: 'ti-x',
    iconColor: 'text-danger',
    label: 'Refusé'
  }
};
