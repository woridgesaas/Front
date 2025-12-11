import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-tax-rates',
    templateUrl: './tax-rates.component.html',
    styleUrl: './tax-rates.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class TaxRatesComponent {

}
