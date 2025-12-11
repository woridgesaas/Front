import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-connected-apps',
    templateUrl: './connected-apps.component.html',
    styleUrl: './connected-apps.component.scss',
    imports: [CommonModule,RouterLink]
})
export class ConnectedAppsComponent {
routes = routes
}
