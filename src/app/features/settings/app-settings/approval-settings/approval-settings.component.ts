import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-approval-settings',
    templateUrl: './approval-settings.component.html',
    styleUrl: './approval-settings.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class ApprovalSettingsComponent {

}
