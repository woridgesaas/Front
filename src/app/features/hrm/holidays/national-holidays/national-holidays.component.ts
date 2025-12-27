import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ IMPORTANT
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../../common/footer/footer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-national-holidays',
  standalone: true,
  imports: [
    CommonModule, // ✅ OBLIGATOIRE pour *ngFor
    FooterComponent,
    BreadcrumbsComponent,
    BsDatepickerModule,
    FormsModule,
  ],
  templateUrl: './national-holidays.component.html',
  styleUrls: ['../holidays.components.scss'],
})
export class NationalHolidaysComponent implements OnInit {
  bsRangeValue?: Date[];

  selectedMonth: number | '' = '';
  months: { value: number; label: string }[] = [];

  ngOnInit(): void {
    this.generateMonths();
  }

  generateMonths() {
    const formatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });

    this.months = Array.from({ length: 12 }, (_, i) => {
      const label = formatter.format(new Date(2025, i, 1));
      return {
        value: i + 1,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      };
    });
  }
}
