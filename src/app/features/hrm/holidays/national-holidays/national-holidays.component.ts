import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-national-holidays',
  standalone: true,
  imports: [
    FooterComponent,
    BreadcrumbsComponent,
    BsDatepickerModule,
    FormsModule
  ],
  templateUrl: './national-holidays.component.html',
styleUrls: ['../holidays.components.scss']
})
export class NationalHolidaysComponent {

  breadCrumbItems = [
    { label: 'Employée', link: '/employee' },
    { label: 'Jours fériés' },
    { label: 'Fêtes nationales', active: true }
  ];

  bsRangeValue?: Date[];
  selectedMonth: string = '';


}
