import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-payslip',
    templateUrl: './payslip.component.html',
    styleUrl: './payslip.component.scss',
    imports: [CommonModule,CollapseHeaderComponent,BreadcrumbsComponent]
})
export class PayslipComponent {
  public routes = routes;
  initChecked = false;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
            { label: 'HR' },
            { label: 'Payslip', active: true }
        ];
  }
}
