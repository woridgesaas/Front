import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
import { AnoncesChartComponent } from '../../../../application/social-feed/components/anonces-chart/anonces-chart.component';

@Component({
  selector: 'app-admin-kpi-cards',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AnoncesChartComponent
  ],
  templateUrl: './admin-kpi-cards.component.html',
})
export class AdminKpiCardsComponent {
  routes = routes;
}
