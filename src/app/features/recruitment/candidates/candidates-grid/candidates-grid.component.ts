import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, breadCrumbItems, CandidateInfo } from '../../../../shared/models/models';
import { DataService } from '../../../../shared/data/data.service';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { DateRangePickerComponent } from '../../../common/date-range-picker/date-range-picker.component';

@Component({
    selector: 'app-candidates-grid',
    templateUrl: './candidates-grid.component.html',
    styleUrl: './candidates-grid.component.scss',
    imports : [BreadcrumbsComponent,CollapseHeaderComponent,
      DateRangePickerComponent,
      RouterModule,CommonModule,MatSelectModule,MatSortModule]
})
export class CandidatesGridComponent {
  public routes = routes;
  public actualData: CandidateInfo[] = [];
  breadCrumbItems: breadCrumbItems[] =[];
  constructor(
    private data: DataService,
  ) {
    this.breadCrumbItems = [
      { label: 'Recruitment' },
      { label: 'Candidates Grid', active: true }
  ];
    this.data.getCandidatesList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
    });
  }
}
