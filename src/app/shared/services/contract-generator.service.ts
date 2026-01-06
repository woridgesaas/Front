import { Injectable } from '@angular/core';
import { CDI_TEMPLATE } from '../../features/hrm/contract/templates/cdi.temlate';
import { CDD_TEMPLATE } from '../../features/hrm/contract/templates/cdd.template';
import { ContractContext } from '../models/contract-context.model';

@Injectable({ providedIn: 'root' })
export class ContractGeneratorService {

  generate(type: 'CDI' | 'CDD', context: ContractContext): string {
    const template = type === 'CDI' ? CDI_TEMPLATE : CDD_TEMPLATE;

    return template.replace(/{{(.*?)}}/g, (_, key) => {
      return (context as any)[key.trim()] ?? '';
    });
  }
}
