import { Pipe, PipeTransform } from '@angular/core';
import { EXCEPTIONAL_LEAVE_NAME } from '../enums/exceptional-leave-name.enum';

@Pipe({ name: 'exceptionalLeaveName', standalone: true })
export class ExceptionalLeaveNamePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return EXCEPTIONAL_LEAVE_NAME[value] ?? value;
  }
}
