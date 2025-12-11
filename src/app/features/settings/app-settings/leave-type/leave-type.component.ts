import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-leave-type',
    templateUrl: './leave-type.component.html',
    styleUrl: './leave-type.component.scss',
    imports: [CommonModule,MatSelectModule]
})
export class LeaveTypeComponent {

}
