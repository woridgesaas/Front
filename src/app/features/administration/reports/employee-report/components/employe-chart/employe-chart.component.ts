import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-employe-chart',
  imports: [ 
    CommonModule,
    FormsModule,
    NgApexchartsModule,
            ],
  templateUrl: './employe-chart.component.html',
  styleUrl: './employe-chart.component.scss',
})
export class EmployeChartComponent {
  @Input() evolutionEmployesChart:any;
}
