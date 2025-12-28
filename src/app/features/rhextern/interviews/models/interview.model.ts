
export interface Interview {
    id: string;
    candidat: CandidatInfo;
    interviewer: InterviewerInfo;
    date: string;
    heure: string;
    duree: number;
    type: InterviewType;
    statut: InterviewStatut;
    salle?: string;
    lienVisio?: string;
    notes?: string;
    scoreIA?: number;
    validationIA?: boolean;
  }
  
  export interface CandidatInfo {
    nom: string;
    email: string;
    poste: string;
    photo: string;
    telephone?: string;
  }
  
  export interface InterviewerInfo {
    nom: string;
    email: string;
    photo: string;
  }
  
  export type InterviewType = 
    | 'Téléphonique' 
    | 'Visioconférence' 
    | 'Présentiel' 
    | 'Technique';
  
  export type InterviewStatut = 
    | 'Planifié'
    | 'Confirmé'
    | 'En cours'
    | 'Terminé'
    | 'Annulé'
    | 'Reporté';
  
  export interface InterviewFilters {
    dateDebut: string;
    dateFin: string;
    interviewer: string;
    candidat: string;
    statut: string;
  }
  
  /**
   * Créer un entretien vide
   */
  export function createEmptyInterview(): Partial<Interview> {
    return {
      candidat: {
        nom: '',
        email: '',
        poste: '',
        photo: 'default-avatar.jpg'
      },
      interviewer: {
        nom: '',
        email: '',
        photo: 'default-avatar.jpg'
      },
      date: '',
      heure: '',
      duree: 60,
      type: 'Visioconférence',
      statut: 'Planifié',
      validationIA: false
    };
  }
  
  /**
   * Classes CSS pour les statuts
   */
  export function getStatutClass(statut: InterviewStatut): string {
    const classes: Record<InterviewStatut, string> = {
      'Planifié': 'bg-primary-400',
      'Confirmé': 'bg-success',
      'En cours': 'bg-info',
      'Terminé': 'bg-success',
      'Annulé': 'bg-danger',
      'Reporté': 'bg-warning'
    };
    return classes[statut] || 'bg-secondary';
  }
  
  /**
   * Classes CSS pour les types
   */
  export function getTypeClass(type: InterviewType): string {
    const classes: Record<InterviewType, string> = {
      'Téléphonique': 'bg-purple-transparent',
      'Visioconférence': 'bg-info-transparent',
      'Présentiel': 'bg-success-transparent',
      'Technique': 'bg-warning-transparent'
    };
    return classes[type] || 'bg-secondary-transparent';
  }
  
  /**
   * Formater une date
   */
  export function formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Formater une date courte
   */
  export function formatDateShort(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }