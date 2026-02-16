import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-depart-distribution-chart',
  imports: [    CommonModule,
    FormsModule,
    NgApexchartsModule
  ],
  templateUrl: './depart-distribution-chart.component.html',
  styleUrl: './depart-distribution-chart.component.scss',
})
export class DepartDistributionChartComponent {
  @Input() repartitionDepartementsChart:any;
  @Input() totalEmployes:any;
}
