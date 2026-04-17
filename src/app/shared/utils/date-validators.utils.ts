import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static pastOrPresent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const inputDate = new Date(control.value);

      if (isNaN(inputDate.getTime())) {
        return { invalidDate: true };
      }

      const today = new Date();

      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return inputDate > today ? { futureDate: true } : null;
    };
  }

  static past(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const inputDate = new Date(control.value);

      if (isNaN(inputDate.getTime())) {
        return { invalidDate: true };
      }

      const today = new Date();

      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return inputDate >= today ? { futureOrToday: true } : null;
    };
  }
}
