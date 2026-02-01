import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from "../../../../common/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-employee-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-performance.component.html',
})
export class EmployeeWelcomeComponent implements OnInit, OnDestroy {
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
