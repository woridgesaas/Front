import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrl: './payslip.component.scss',
  imports: [CommonModule, BreadcrumbsComponent],
})
export class PayslipComponent {
  public routes = routes;
  initChecked = false;
  breadCrumbItems: breadCrumbItems[] = [];

  constructor() {
    this.breadCrumbItems = [
      { label: 'RH' },
      { label: 'Bulletin de Paie', active: true },
    ];
  }
}
