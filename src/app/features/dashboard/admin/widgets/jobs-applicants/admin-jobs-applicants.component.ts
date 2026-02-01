import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-jobs-applicants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-jobs-applicants.component.html',
})
export class AdminJobsApplicantsComponent {}
