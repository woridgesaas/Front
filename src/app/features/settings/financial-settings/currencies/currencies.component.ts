import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-currencies',
    templateUrl: './currencies.component.html',
    styleUrl: './currencies.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class CurrenciesComponent {

}
