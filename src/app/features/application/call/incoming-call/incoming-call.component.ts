import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
@Component({
    selector: 'app-incoming-call',
    templateUrl: './incoming-call.component.html',
    styleUrl: './incoming-call.component.scss',
    imports:[CommonModule,CollapseHeaderComponent,
      BreadcrumbsComponent,NgScrollbarModule
    ]
})
export class IncomingCallComponent {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
      { label: 'Application' },
      { label: 'Incoming Calls', active: true }
  ];
  }
}
