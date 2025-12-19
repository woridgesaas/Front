import { Component } from '@angular/core';

@Component({
  selector: 'app-sondage-charts',
  imports: [],
  templateUrl: './sondage-charts.component.html',
  styleUrl: './sondage-charts.component.scss',
})
export class SondageChartsComponent {
  stats:any =[
    {
    title: 'Sondages actifs',
    value: '3',
  },
  {
    title: 'Total sondages', 
    value: '42',
  },
  {
    title: 'Participants totaux',
    value: '1,245',
  }
  ]

  
}
