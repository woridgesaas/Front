import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-summary',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './employee-summary.component.html',
})
export class EmployeeSummaryComponent implements AfterViewInit {

  @Input() employeeName = 'Adrian';
  @Input() currentTime = '08:35 AM, 11 Mar 2025';
  @Input() productionHours = 3.45;
  @Input() checkInTime = '10:00 AM';
  @Input() avatarUrl = 'assets/img/profiles/avatar-27.jpg';
  @Input() progress = 65;

  leftTransform = 'rotate(0deg)';
  rightTransform = 'rotate(0deg)';

  ngAfterViewInit(): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    if (this.progress <= 50) {
      this.rightTransform = `rotate(${this.toDeg(this.progress)}deg)`;
    } else {
      this.rightTransform = 'rotate(180deg)';
      this.leftTransform = `rotate(${this.toDeg(this.progress - 50)}deg)`;
    }
  }

  private toDeg(value: number): number {
    return (value / 100) * 360;
  }
}
