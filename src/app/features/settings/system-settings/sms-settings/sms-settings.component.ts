import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-sms-settings',
    templateUrl: './sms-settings.component.html',
    styleUrl: './sms-settings.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class SmsSettingsComponent {

}
