import { AfterViewInit, Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { breadCrumbItems } from '../../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
export interface videocallModel {
  img: string;
  name: string;
}
@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrl: './video-call.component.scss',
    imports:[CommonModule,CollapseHeaderComponent,
      BreadcrumbsComponent
    ]
})
export class VideoCallComponent {
  public routes=routes
  public isChatSearchVisible :boolean = false; 
  isChatUser:boolean=false;
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(){
    this.breadCrumbItems = [
      { label: 'Application' },
      { label: 'Calls', active: true }
  ];
  }
  toggleChatSearch() {
    this.isChatSearchVisible = !this.isChatSearchVisible;
  }
  toggleuser(){
    this.isChatUser=!this.isChatUser;
  }
  toggleclose(){
    this.isChatSearchVisible=false;
  }
  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
