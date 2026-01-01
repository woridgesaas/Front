import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-leave-evolution-chart',
  imports: [NgApexchartsModule],
  templateUrl: './leave-evolution-chart.component.html',
  styleUrl: './leave-evolution-chart.component.scss',
})
export class LeaveEvolutionChartComponent {
  @Input() leaveEvolutionChart:any;
}
