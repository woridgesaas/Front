import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LeaveModalComponent } from './leave-modal/leave-modal.component';

@Component({
    selector: 'app-leaves',
    templateUrl: './leaves.component.html',
    styleUrl: './leaves.component.scss',
    imports: [CommonModule,RouterModule,RouterOutlet,BsDatepickerModule,LeaveModalComponent]
})
export class LeavesComponent {

}
