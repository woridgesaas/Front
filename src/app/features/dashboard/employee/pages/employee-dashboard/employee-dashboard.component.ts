import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { EmployeeWelcomeComponent } from '../../widgets/employee-welcome/employee-welcome.component';
import { EmployeePerformanceComponent } from '../../widgets/employee-performance/employee-performance.component';
import { EmployeeLeaveSummaryComponent } from '../../widgets/employee-summary/employee-leave-summary.component';
import { EmployeePresenceDetailsComponent } from '../../widgets/employee-presence/employee-presence-details.component';
import { EmployeeSummaryComponent } from '../../../../common/employee-summary/employee-summary.component';
import { EmployeeKpisComponent } from '../../../../common/employee-kpis/employee-kpis.component';
import { TeamMembersComponent } from "../../widgets/performance-chart/employee-performance.component";

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  templateUrl: './employee-dashboard.component.html',
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    EmployeeWelcomeComponent,
    EmployeePerformanceComponent,
    EmployeeLeaveSummaryComponent,
    EmployeePresenceDetailsComponent,
    EmployeeSummaryComponent,
    EmployeeKpisComponent,
    TeamMembersComponent
],
})
export class EmployeeDashboardComponent {}
