import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notification-settings',
    templateUrl: './notification-settings.component.html',
    styleUrl: './notification-settings.component.scss',
    imports: [CommonModule,RouterLink]
})
export class NotificationSettingsComponent {
routes = routes
}
