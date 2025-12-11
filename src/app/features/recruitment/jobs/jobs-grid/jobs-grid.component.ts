import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, breadCrumbItems, JobsInfo } from '../../../../shared/models/models';
import { DataService } from '../../../../shared/data/data.service';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';

@Component({
    selector: 'app-jobs-grid',
    templateUrl: './jobs-grid.component.html',
    styleUrl: './jobs-grid.component.scss',
    imports: [CommonModule,BreadcrumbsComponent,CollapseHeaderComponent,RouterLink,DateRangePickerComponent]
})
export class JobsGridComponent {
  public routes = routes;
  public actualData: JobsInfo[] = [];
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(
    private data: DataService,
  ) {
    this.breadCrumbItems = [
      { label: 'Recruitment' },
      { label: 'Job Grid', active: true }
  ];
    this.data.getJobList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
    });
  }

}
