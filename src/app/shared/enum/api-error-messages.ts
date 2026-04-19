export const API_ERROR_MESSAGES: Record<string, string> = {
  //* Education
  EDUCATION_DUPLICATED: 'Cette formation existe déjà',
  EDUCATION_END_DATE_MISSING:
    'La date de fin est obligatoire pour une formation de type éducation',
  EDUCATION_NOT_FOUND: 'Formation introuvable',
  INVALID_EDUCATION_END_DATE:
    'La date de fin doit être postérieure à la date de début',

  //* Bank information
  BANK_INFORMATION_DUPLICATED: 'Les informations bancaires existent déjà',
  BANK_INFORMATION_NOT_FOUND: 'Informations bancaires introuvables',
  IBAN_DUPLICATED: 'Cet IBAN est déjà utilisé',
  RIB_DUPLICATED: 'Ce RIB est déjà utilisé',

  //* Professional experience
  CURRENT_PROFESSIONAL_EXPERIENCE_WITH_END_DATE:
    'Une expérience en cours ne doit pas contenir de date de fin',
  INVALID_PROFESSIONAL_EXPERIENCE_END_DATE:
    'La date de fin doit être postérieure à la date de début',
  PROFESSIONAL_EXPERIENCE_DUPLICATED:
    'Cette expérience professionnelle existe déjà',
  PROFESSIONAL_EXPERIENCE_END_DATE_MISSING:
    "La date de fin est obligatoire lorsque l'expérience n'est pas en cours",
  PROFESSIONAL_EXPERIENCE_NOT_FOUND: 'Expérience professionnelle introuvable',

  //* User
  USER_NOT_FOUND: 'Utilisateur introuvable',
  EMAIL_DUPLICATED: 'Adresse email est déjà utilisée',
  CIN_DUPLICATED: 'CIN est déjà utilisé',

  //* Profile Update Request
  PENDING_PROFILE_UPDATE_REQUEST_ALREADY_EXISTS:
    'Une demande de mise à jour est déjà en attente',
  PROFILE_UPDATE_REQUEST_NOT_FOUND: 'Demande introuvable',
  PROFILE_UPDATE_REQUEST_NOT_PENDING: 'Cette demande a déjà été traitée',

   //* Leaves
  JUSTIFICATION_REQUIRED: 'Un justificatif est obligatoire pour ce type de congé',
  INSUFFICIENT_BALANCE: 'Votre solde de congés est insuffisant',
  INVALID_DATES: 'Les dates saisies sont invalides ou chevauchent un congé existant',
  LEAVES_NOT_FOUND: 'Demande de congé introuvable',
  ACCESS_DENIED: 'Accès non autorisé',
};
