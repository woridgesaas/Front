
export interface Candidate {
    Cand_ID: string;
    Candidate: string;
    Email: string;
    Phone: string;
    Applied_Role: string;
    Applied_Date: string;
    Status: CandidateStatus;
    Image: string;
    sNo?: number;
    isSelected?: boolean;
  }
  
  /**
   * Énumération des statuts possibles
   */
  export enum CandidateStatus {
    NEW = 'New',
    SCHEDULED = 'Scheduled',
    INTERVIEWED = 'Interviewed',
    OFFERED = 'Offered',
    HIRED = 'Hired',
    REJECTED = 'Rejected'
  }
  
  /**
   * Interface pour la réponse de l'API
   */
  export interface CandidateApiResponse {
    data: Candidate[];
    totalData: number;
    success: boolean;
    message?: string;
  }
  
  /**
   * Configuration des badges de statut
   */
  export const STATUS_CONFIG = {
    [CandidateStatus.HIRED]: {
      badge: 'border-success text-success',
      icon: 'ti-circle-check',
      iconColor: 'text-success',
      label: 'Embauché'
    },
    [CandidateStatus.NEW]: {
      badge: 'border-purple text-purple',
      icon: 'ti-star',
      iconColor: 'text-purple',
      label: 'Nouveau'
    },
    [CandidateStatus.INTERVIEWED]: {
      badge: 'border-info text-info',
      icon: 'ti-user-check',
      iconColor: 'text-info',
      label: 'Interviewé'
    },
    [CandidateStatus.SCHEDULED]: {
      badge: 'border-pink text-pink',
      icon: 'ti-calendar',
      iconColor: 'text-pink',
      label: 'Entretien Planifié'
    },
    [CandidateStatus.OFFERED]: {
      badge: 'border-warning text-warning',
      icon: 'ti-mail',
      iconColor: 'text-warning',
      label: 'Offre Envoyée'
    },
    [CandidateStatus.REJECTED]: {
      badge: 'border-danger text-danger',
      icon: 'ti-x',
      iconColor: 'text-danger',
      label: 'Refusé'
    }
  };