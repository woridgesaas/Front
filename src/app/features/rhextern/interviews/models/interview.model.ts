// models/interview.model.ts

export type InterviewType = 
  | 'Visioconference' 
  | 'Presentiel' 
  | 'Telephonique';

export type InterviewStatut = 
  | 'Planifie'
  | 'Confirme'
  | 'EnCours'
  | 'Termine'
  | 'Reporte'
  | 'Annule';

export interface ParticipantResponse {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  role: string;
  attendanceStatus: string;
  invitationDate?: string;
  responseDate?: string;
}

// export interface EvaluationResponse {
//   id: number;
//   interviewId: number;
//   result: string;
//   skillScores?: Record<string, number>;
//   comment?: string;
//   recommendation?: string;
//   createdAt: string;
// }

// Réponse API → ce qu'on reçoit du backend
export interface Interview {
  id: number;
  applicationId?: number;
  aiScore?: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  targetPosition?: string;
  startDateTime: string;
  durationMinutes: number;
  type: InterviewType;
  videoConferenceLink?: string;
  location?: string;
  phoneNumber?: string;
  notes?: string;
  status: InterviewStatut;
  createdAt: string;
  participants: ParticipantResponse[];
  evaluation?: EvaluationResponse;
}

// DTO pour créer un entretien → ce qu'on envoie au backend
export interface CreateInterviewDto {
  applicationId?: number;
  aiScore?: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  targetPosition?: string;
  startDateTime: string;
  durationMinutes: number;
  type: number;  // 0=Visio, 1=Presentiel, 2=Telephonique
  videoConferenceLink?: string;
  location?: string;
  phoneNumber?: string;
  notes?: string;
  interviewerId: number;
  interviewerName: string;
  interviewerEmail: string;
}

// DTO pour modifier
export interface UpdateInterviewDto {
  startDateTime: string;
  durationMinutes: number;
  type: number;
  videoConferenceLink?: string;
  location?: string;
  phoneNumber?: string;
  notes?: string;
}

// DTO pour changer le statut
export interface UpdateStatusDto {
  status: number; // 0=Planifie, 1=Confirme, 2=EnCours, 3=Termine, 4=Reporte, 5=Annule
}

// Filtres (côté frontend uniquement)
export interface InterviewFilters {
  dateDebut: string;
  dateFin: string;
  interviewerId?: number;
  candidat: string;
  statut: string;
}

// ========== HELPERS ==========

export function getStatutLabel(statut: InterviewStatut): string {
  const labels: Record<InterviewStatut, string> = {
    'Planifie': 'Planifié',
    'Confirme': 'Confirmé',
    'EnCours':  'En cours',
    'Termine':  'Terminé',
    'Reporte':  'Reporté',
    'Annule':   'Annulé'
  };
  return labels[statut] || statut;
}

export function getStatutClass(statut: InterviewStatut): string {
  const classes: Record<InterviewStatut, string> = {
    'Planifie': 'bg-primary-400',
    'Confirme': 'bg-success',
    'EnCours':  'bg-info',
    'Termine':  'bg-success',
    'Reporte':  'bg-warning',
    'Annule':   'bg-danger'
  };
  return classes[statut] || 'bg-secondary';
}

export function getTypeLabel(type: InterviewType): string {
  const labels: Record<InterviewType, string> = {
    'Visioconference': 'Visioconférence',
    'Presentiel':      'Présentiel',
    'Telephonique':    'Téléphonique'
  };
  return labels[type] || type;
}

export function getTypeClass(type: InterviewType | number): string {
  const classes: Record<string, string> = {
    // Valeurs string depuis le mapper
    'Visioconference': 'bg-info-transparent text-info',
    'Presentiel':      'bg-success-transparent text-success',
    'Telephonique':    'bg-purple-transparent text-purple',
    // Valeurs number directes (au cas où)
    '0': 'bg-info-transparent text-info',
    '1': 'bg-success-transparent text-success',
    '2': 'bg-purple-transparent text-purple'
  };
  return classes[String(type)] || 'bg-secondary-transparent text-secondary';
}

export function getStatutValue(statut: InterviewStatut): number {
  const values: Record<InterviewStatut, number> = {
    'Planifie': 0,
    'Confirme': 1,
    'EnCours':  2,
    'Termine':  3,
    'Reporte':  4,
    'Annule':   5
  };
  return values[statut];
}

export function formatDateShort(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatTime(dateTime: string): string {
  const d = new Date(dateTime);
  return d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
}
export interface CreateEvaluationDto {
  result:         number;  // 0=EnAttente, 1=Retenu, 2=Rejete
  skillScores?:   Record<string, number>;
  comment?:       string;
  recommendation?: number; // 0=Embaucher, 1=Refuser, 2=DeuxiemeEntretien
}
export interface EvaluationResponse {
  id:              number;
  interviewId:     number;
  result:          number | string;
  skillScores?:    Record<string, number>;
  comment?:        string;
  recommendation?: number | string;
  createdAt:       string;
}