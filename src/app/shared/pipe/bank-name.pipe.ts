import { Pipe, PipeTransform } from '@angular/core';
import {
  BANK_NAME,
  BankName,
} from '../../features/hrm/employees/enums/bank-name.enum';

@Pipe({ name: 'bankName', standalone: true })
export class BankNamePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return BANK_NAME[value as BankName] ?? value;
  }
}
