import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-attendance-evolution-chart',
  imports: [NgApexchartsModule],
  templateUrl: './attendance-evolution-chart.component.html',
})
export class AttendanceEvolutionChartComponent {
  @Input() presenceEvolutionChart:any;
}
