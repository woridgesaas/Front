import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cronjob-schedule',
    templateUrl: './cronjob-schedule.component.html',
    styleUrl: './cronjob-schedule.component.scss',
    imports: [CommonModule,RouterLink]
})
export class CronjobScheduleComponent {
public routes=routes;
}
