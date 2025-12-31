import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-view-switch',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './attendance-view-switch.component.html',
})
export class AttendanceViewSwitchComponent {
  @Input() employeeRoute!: string;
  @Input() adminRoute!: string;
}
