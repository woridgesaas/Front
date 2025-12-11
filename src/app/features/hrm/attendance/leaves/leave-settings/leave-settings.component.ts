import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../../../common/collapse-header/collapse-header.component';
@Component({
    selector: 'app-leave-settings',
    templateUrl: './leave-settings.component.html',
    styleUrl: './leave-settings.component.scss',
    imports: [CommonModule,RouterModule,BsDatepickerModule,BreadcrumbsComponent,CollapseHeaderComponent]  
})
export class LeaveSettingsComponent {
  public routes = routes;
  initChecked = false;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
            { label: 'Performance' },
            { label: 'Performance Reviews', active: true }
        ];
  }
}
