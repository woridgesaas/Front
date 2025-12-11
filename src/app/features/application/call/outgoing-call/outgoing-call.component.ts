import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
@Component({
    selector: 'app-outgoing-call',
    templateUrl: './outgoing-call.component.html',
    styleUrl: './outgoing-call.component.scss',
    imports:[CommonModule,CollapseHeaderComponent,
      BreadcrumbsComponent
    ]
})
export class OutgoingCallComponent {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
      { label: 'Application' },
      { label: 'Outgoing Calls', active: true }
  ];
  }
}
