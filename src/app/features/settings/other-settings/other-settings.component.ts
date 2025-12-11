import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-other-settings',
    templateUrl: './other-settings.component.html',
    styleUrl: './other-settings.component.scss',
    imports: [CommonModule,RouterModule]
})
export class OtherSettingsComponent {
  base = '';
  page = '';
  last = '';
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
}
}
