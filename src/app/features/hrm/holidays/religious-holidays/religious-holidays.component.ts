import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';

@Component({
  selector: 'app-religious-holidays',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDatepickerModule,
    BreadcrumbsComponent,
    FooterComponent
  ],
  templateUrl: './religious-holidays.component.html',
  styleUrls: ['./religious-holidays.component.scss']
})
export class ReligiousHolidaysComponent {

  breadCrumbItems = [
    { label: 'Employée', link: '/employee' },
    { label: 'Jours fériés' },
    { label: 'Fêtes religieuses', active: true }
  ];
  bsRangeValue?: Date[];

}
