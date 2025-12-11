import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-custom-fields',
    templateUrl: './custom-fields.component.html',
    styleUrl: './custom-fields.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class CustomFieldsComponent {

}
