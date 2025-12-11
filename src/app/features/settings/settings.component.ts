import { Component } from '@angular/core';
import { breadCrumbItems } from '../../shared/models/models';
import { CommonService } from '../../shared/common/common.service';
import { routes } from '../../shared/routes/routes';
import { RouterModule } from '@angular/router';
import { CollapseHeaderComponent } from '../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../common/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    imports: [RouterModule,CollapseHeaderComponent,BreadcrumbsComponent,FooterComponent,CommonModule]
})
export class SettingsComponent {
  base = '';
  page = '';
  last = '';
  breadCrumbItems: breadCrumbItems[] =[];
  routes = routes
  constructor(private common: CommonService) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.breadCrumbItems = [
      { label: 'Administration' },
      { label: 'Settings', active: true }
  ];
}
}
