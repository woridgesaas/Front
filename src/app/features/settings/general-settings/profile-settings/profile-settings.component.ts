import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrl: './profile-settings.component.scss',
    imports: [CommonModule,MatSelectModule,RouterLink],
})
export class ProfileSettingsComponent {
routes = routes
}
