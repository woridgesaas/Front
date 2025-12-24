import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrl: './employee-details.component.scss',
    imports: [CommonModule, RouterModule,CollapseHeaderComponent,RouterLink,EmployeeDetailModalComponent,]
})
export class EmployeeDetailsComponent {
 public routes=routes;
}
