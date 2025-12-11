import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../common/footer/footer.component';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrl: './attendance.component.scss',
    imports: [CommonModule,RouterModule,RouterOutlet,FooterComponent]
})
export class AttendanceComponent {

}
