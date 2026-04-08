export interface Interviewer {
  id:             number;
  externalUserId: string;
  fullName:       string;
  email:          string;
  role:           string;
  // Alias pour compatibilité avec les composants existants
  nom:        string;
  specialite: string;
  photo:      string;
  isActive?:  boolean;
}

export function createEmptyInterviewer(): Interviewer {
  return {
    id:             0,
    externalUserId: '',
    fullName:       '',
    email:          '',
    role:           '',
    nom:            '',
    specialite:     '',
    photo:          'default-avatar.jpg',
    isActive:       true
  };
}