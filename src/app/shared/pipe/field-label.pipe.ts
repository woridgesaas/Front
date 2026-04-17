import { Pipe, PipeTransform } from '@angular/core';
import { PERSONAL_INFORMATION_FIELDS } from '../../features/hrm/validation/validate-personal-information/enums/personal-information-fields.enum';
import { BANK_INFORMATION_FIELDS } from '../../features/hrm/validation/validate-personal-information/enums/bank-information-fields.enum';
import { EDUCATION_FIELDS } from '../../features/hrm/validation/validate-personal-information/enums/education-fields.enum';
import { EXPERIENCE_FIELDS } from '../../features/hrm/validation/validate-personal-information/enums/professional-experience-fields.enum';

@Pipe({
  name: 'fieldLabel',
  standalone: true,
})
export class FieldLabelPipe implements PipeTransform {
  transform(field: string, section?: string): string {
    let map: Record<string, string> = {};

    switch (section) {
      case 'PERSONAL_INFORMATION':
        map = PERSONAL_INFORMATION_FIELDS;
        break;

      case 'BANK_INFORMATION':
        map = BANK_INFORMATION_FIELDS;
        break;

      case 'EDUCATION':
        map = EDUCATION_FIELDS;
        break;

      case 'PROFESSIONAL_EXPERIENCE':
        map = EXPERIENCE_FIELDS;
        break;
    }

    return map[field] || field;
  }
}
