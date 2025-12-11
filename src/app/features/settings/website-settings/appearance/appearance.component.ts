import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.component.html',
    styleUrl: './appearance.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class AppearanceComponent {

}
