export const COLOR_PATTERN =
  /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)|[a-zA-Z]+)$/;

export const FOUNDED_YEAR_PATTERN = /^\d{4}$/;

export const MOROCCAN_PHONE_PATTERN = /^(\+212|0)([567])[0-9]{8}$/;

export const LINKEDIN_URL_PATTERN =
  /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ALLOWED_LOGO_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.svg',
];
export const ALLOWED_LOGO_CONTENT_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
];
export const MAX_LOGO_SIZE_MB = 2;
export const MAX_LOGO_SIZE_BYTES = MAX_LOGO_SIZE_MB * 1024 * 1024;

export interface RecruitmentSiteValidationErrors {
  primaryColor?: string;
  secondaryColor?: string;
  description?: string;
  foundedYear?: string;
  email?: string;
  phone?: string;
  address?: string;
  linkedinUrl?: string;
  logo?: string;
}

export function validateRecruitmentSiteForm(
  form: {
    primaryColor: string;
    secondaryColor: string;
    description: string;
    foundedYear: string;
    email: string;
    phone: string;
    address: string;
    linkedinUrl: string;
  },
  logo: File | null,
  isFirstConfiguration: boolean,
): RecruitmentSiteValidationErrors {
  const errors: RecruitmentSiteValidationErrors = {};

  //* Primary color
  if (!form.primaryColor?.trim()) {
    errors.primaryColor = 'La couleur principale est obligatoire';
  } else if (!COLOR_PATTERN.test(form.primaryColor)) {
    errors.primaryColor =
      'La couleur principale doit être une valeur hexadécimale, RGB ou un nom de couleur valide';
  }

  //* Secondary color
  if (!form.secondaryColor?.trim()) {
    errors.secondaryColor = 'La couleur secondaire est obligatoire';
  } else if (!COLOR_PATTERN.test(form.secondaryColor)) {
    errors.secondaryColor =
      'La couleur secondaire doit être une valeur hexadécimale, RGB ou un nom de couleur valide';
  }

  //* Description
  if (!form.description?.trim()) {
    errors.description = 'La description est obligatoire';
  } else if (form.description.length < 10 || form.description.length > 1000) {
    errors.description =
      'La description doit contenir entre 10 et 1000 caractères';
  }

  //* Founded year
  if (!form.foundedYear?.trim()) {
    errors.foundedYear = "L'année de création est obligatoire";
  } else if (!FOUNDED_YEAR_PATTERN.test(form.foundedYear)) {
    errors.foundedYear =
      "L'année de création doit être une année valide (4 chiffres)";
  }

  //* Email
  if (!form.email?.trim()) {
    errors.email = "L'adresse email est obligatoire";
  } else if (!EMAIL_PATTERN.test(form.email)) {
    errors.email = "L'adresse email n'est pas valide";
  }

  //* Phone
  if (!form.phone?.trim()) {
    errors.phone = 'Le numéro de téléphone est obligatoire';
  } else if (!MOROCCAN_PHONE_PATTERN.test(form.phone)) {
    errors.phone = 'Le numéro de téléphone doit être un numéro marocain valide';
  }

  //* Address
  if (!form.address?.trim()) {
    errors.address = "L'adresse est obligatoire";
  } else if (form.address.length < 5 || form.address.length > 255) {
    errors.address = "L'adresse doit contenir entre 5 et 255 caractères";
  }

  //* LinkedIn URL
  if (!form.linkedinUrl?.trim()) {
    errors.linkedinUrl = "L'URL LinkedIn est obligatoire";
  } else if (!LINKEDIN_URL_PATTERN.test(form.linkedinUrl)) {
    errors.linkedinUrl = "L'URL LinkedIn n'est pas valide";
  }

  //* Logo
  if (isFirstConfiguration && !logo) {
    errors.logo = 'Le logo est obligatoire pour la première configuration';
  } else if (logo) {
    if (logo.size > MAX_LOGO_SIZE_BYTES) {
      errors.logo = `Le logo ne doit pas dépasser ${MAX_LOGO_SIZE_MB} Mo`;
    } else {
      const filename = logo.name.toLowerCase();
      const hasValidExtension = ALLOWED_LOGO_EXTENSIONS.some((ext) =>
        filename.endsWith(ext),
      );
      if (!hasValidExtension) {
        errors.logo = 'Le logo doit être au format PNG, JPG, WEBP ou SVG';
      } else if (!ALLOWED_LOGO_CONTENT_TYPES.includes(logo.type)) {
        errors.logo = 'Le type de fichier du logo est invalide';
      }
    }
  }

  return errors;
}

export function isFormValid(errors: RecruitmentSiteValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
