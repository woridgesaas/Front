import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-bussiness-settings',
    templateUrl: './bussiness-settings.component.html',
    styleUrl: './bussiness-settings.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class BussinessSettingsComponent {

}
