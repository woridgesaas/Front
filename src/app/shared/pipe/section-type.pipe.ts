import { Pipe, PipeTransform } from '@angular/core';
import {
  SECTION_TYPE,
  SectionType,
} from '../../features/hrm/validation/validate-personal-information/enums/section-type.enum';

@Pipe({ name: 'sectionType', standalone: true })
export class SectionTypePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return SECTION_TYPE[value as SectionType] ?? value;
  }
}
