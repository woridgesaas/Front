import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FooterComponent } from '../../../../common/footer/footer.component';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';

import { DashboardWelcomeComponent } from '../../widgets/dashboard-welcome/dashboard-welcome.component';
import { AdminKpiCardsComponent } from '../../widgets/admin-kpi-cards/admin-kpi-cards.component';
import { AdminAttendanceOverviewComponent } from '../../widgets/attendance-overview/attendance-overview.component';
import { AdminEmployeesByDepartmentComponent } from '../../widgets/employees-department-chart/employees-by-department.component';
import { ManagersTableComponent } from '../../widgets/managers-table/managers-table.component';
import { AdminTotalEmployeesComponent } from "../../widgets/total-employees/admin-total-employees.component";
import { AdminClockInOutComponent } from "../../widgets/Clock-In-out/admin-clock-in-out.component";
import { AdminJobsApplicantsComponent } from "../../widgets/jobs-applicants/admin-jobs-applicants.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    // widgets
    DashboardWelcomeComponent,
    AdminKpiCardsComponent,
    AdminAttendanceOverviewComponent,
    AdminEmployeesByDepartmentComponent,
    ManagersTableComponent,
    AdminTotalEmployeesComponent,
    AdminClockInOutComponent,
    AdminJobsApplicantsComponent
],
})
export class AdminDashboardComponent {}
