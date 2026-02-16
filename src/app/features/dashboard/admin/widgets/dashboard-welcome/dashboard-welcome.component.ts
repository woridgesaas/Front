import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-welcome.component.html',
})
export class DashboardWelcomeComponent implements OnInit, OnDestroy {
  now: Date = new Date();
  private timer!: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
