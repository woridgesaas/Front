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
  JUSTIFICATION_REQUIRED:
    'Un justificatif est obligatoire pour ce type de congé',
  INSUFFICIENT_BALANCE: 'Votre solde de congés est insuffisant',
  INVALID_DATES:
    'Les dates saisies sont invalides ou chevauchent un congé existant',
  LEAVES_NOT_FOUND: 'Demande de congé introuvable',
  ACCESS_DENIED: 'Accès non autorisé',

  //* Absence justification
  ABSENCE_JUSTIFICATION_NOT_CONFIGURED:
    "La justification d'absence n'a pas encore été configurée",

  //* Alert threshold
  ALERT_THRESHOLD_NOT_CONFIGURED:
    "Les seuils d'alerte n'ont pas encore été configurés",
  CRITICAL_THRESHOLD_LESS_THAN_WARNING_THRESHOLD:
    'Le seuil critique doit être supérieur au seuil de notification',

  //* Work schedule
  WORK_SCHEDULE_NOT_CONFIGURED:
    "Les horaires de travail n'ont pas encore été configurés",
  DAILY_HOURS_NOT_ALLOWED_FOR_FIXED_SCHEDULE:
    'Les heures journalières ne sont pas autorisées pour un horaire fixe',
  DAILY_HOURS_OUT_OF_ALLOWED_RANGE:
    "Le nombre d'heures doit être compris entre 1 et 12",
  ENTRY_OR_EXIT_TIME_NOT_ALLOWED_FOR_FLEXIBLE_SCHEDULE:
    "Les horaires d'entrée/sortie ne sont pas autorisés pour un horaire flexible",
  EXIT_TIME_NOT_AFTER_ENTRY_TIME:
    "L'heure de sortie doit être après l'heure d'entrée",
  MISSING_DAILY_HOURS_FOR_FLEXIBLE_SCHEDULE:
    'Les heures journalières sont obligatoires pour un horaire flexible',
  MISSING_ENTRY_TIME_FOR_FIXED_SCHEDULE:
    "L'heure d'entrée est obligatoire pour un horaire fixe",
  MISSING_EXIT_TIME_FOR_FIXED_SCHEDULE:
    "L'heure de sortie est obligatoire pour un horaire fixe",

  //* Annual leave
  ANNUAL_BALANCE_NOT_CONFIGURED: "Le solde annuel n'est pas encore configuré",

  //* Exceptional leave
  EXCEPTIONAL_LEAVE_NOT_CONFIGURED:
    'Les congés exceptionnels ne sont pas encore configurés',

  GRANTED_DAYS_LESS_THAN_LEGAL_BALANCE:
    'Le nombre de jours accordés est inférieur au solde légal autorisé',

  //* Document template
  DOCUMENT_TEMPLATE_NOT_CONFIGURED:
    "Le modèle de document n'a pas encore été configuré",
  INVALID_DOCUMENT_TEMPLATE_CONTENT_TYPE: 'Le fichier doit être au format PDF',
  INVALID_DOCUMENT_TEMPLATE_EXTENSION: "Le fichier doit avoir l'extension .pdf",
  INVALID_DOCUMENT_TEMPLATE_PATH:
    'Le chemin du modèle de document est invalide',
  INVALID_DOCUMENT_TEMPLATE_SIZE:
    'Le fichier dépasse la taille maximale autorisée de 10 Mo',

  //* Recruitment site
  INVALID_RECRUITMENT_SITE_LOGO_CONTENT_TYPE:
    'Le type du logo est invalide. Formats acceptés : PNG, JPG, WEBP, SVG',
  INVALID_RECRUITMENT_SITE_LOGO_EXTENSION:
    "L'extension du logo est invalide. Extensions acceptées : .png, .jpg, .jpeg, .webp, .svg",
  INVALID_RECRUITMENT_SITE_LOGO_SIZE:
    'Le logo dépasse la taille maximale autorisée de 2 Mo',
  MISSING_LOGO_FOR_RECRUITMENT_SITE:
    'Le logo est obligatoire pour configurer le site vitrine',
  RECRUITMENT_SITE_NOT_CONFIGURED:
    "Le site vitrine n'a pas encore été configuré",
};
