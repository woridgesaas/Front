import { Pipe, PipeTransform } from '@angular/core';
import {
  EXPERIENCE_LEVEL,
  ExperienceLevel,
} from '../../features/hrm/employees/enums/experience-level.enum';

@Pipe({ name: 'experienceLevel', standalone: true })
export class ExperienceLevelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return EXPERIENCE_LEVEL[value as ExperienceLevel] ?? value;
  }
}
