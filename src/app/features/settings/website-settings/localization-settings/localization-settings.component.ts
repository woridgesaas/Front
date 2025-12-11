import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-localization-settings',
    templateUrl: './localization-settings.component.html',
    styleUrl: './localization-settings.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class LocalizationSettingsComponent {

}
