import { Pipe, PipeTransform } from '@angular/core';
import {
  EDUCATION_TYPE,
  EducationType,
} from '../../features/hrm/employees/enums/education-type.enum';

@Pipe({ name: 'educationType', standalone: true })
export class EducationTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return EDUCATION_TYPE[value as EducationType] ?? value;
  }
}
