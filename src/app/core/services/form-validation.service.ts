import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  getErrorMessage(
    control: AbstractControl | null,
    fieldName: string
  ): string | null {
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;

    if (errors['required']) {
      return `${fieldName} est obligatoire.`;
    }

    if (errors['email']) {
      return `Format d'email invalide.`;
    }

    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} caractères requis.`;
    }

    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} caractères autorisés.`;
    }

    if (errors['pattern']) {
      if (fieldName.toLowerCase().includes('mot de passe')) {
        return `Doit contenir majuscule, minuscule, chiffre et caractère spécial.`;
      }
      if (fieldName.toLowerCase().includes('cin')) {
        return `CIN doit contenir 4 à 10 caractères alphanumériques.`;
      }

      if (fieldName.toLowerCase().includes('téléphone')) {
        return `Numéro de téléphone invalide.`;
      }

      return `Format invalide.`;
    }

    return `Champ invalide.`;
  }
}
