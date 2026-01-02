import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-absence-type-chart',
  imports: [NgApexchartsModule],
  templateUrl: './daily-absence-type-chart.component.html',
})
export class DailyAbsenceTypeChartComponent {
  @Input() absenceType:any;
}
