import { Pipe, PipeTransform } from '@angular/core';
import {
  EMPLOYMENT_TYPE,
  EmploymentType,
} from '../../features/hrm/employees/enums/employement-type.enum';

@Pipe({ name: 'employmentType', standalone: true })
export class EmploymentTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return EMPLOYMENT_TYPE[value as EmploymentType] ?? value;
  }
}
