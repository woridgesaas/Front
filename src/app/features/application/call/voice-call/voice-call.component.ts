import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
@Component({
    selector: 'app-voice-call',
    templateUrl: './voice-call.component.html',
    styleUrl: './voice-call.component.scss',
    imports:[CommonModule,CollapseHeaderComponent,BreadcrumbsComponent]
})
export class VoiceCallComponent {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
      { label: 'Application' },
      { label: 'Voice Call', active: true }
  ];
  }
}
