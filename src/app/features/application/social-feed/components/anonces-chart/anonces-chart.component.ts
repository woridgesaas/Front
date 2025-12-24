import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
@Component({
  selector: 'app-anonces-chart',
  imports: [NgApexchartsModule , CommonModule, RouterLink],
  templateUrl: './anonces-chart.component.html',
})
export class AnoncesChartComponent implements OnInit {
  routes = routes;
    statsChart: any = {};
    totalAnnonces: number = 32;
    annoncesAujourdhui: number = 5;
    croissance: number = 12; // en %
  ngOnInit(): void {
   
      
   
  }

}