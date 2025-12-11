import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-employee-grid',
    templateUrl: './employee-grid.component.html',
    styleUrl: './employee-grid.component.scss',
    imports: [CommonModule,RouterLink,BreadcrumbsComponent,CollapseHeaderComponent,FormsModule]
})
export class EmployeeGridComponent {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor() {
    this.breadCrumbItems = [
      { label: 'Employee' },
      { label: 'Employee Grid', active: true }
  ];
}

}
