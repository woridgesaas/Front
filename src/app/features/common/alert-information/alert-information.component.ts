import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-information.component.html',
  styleUrl: './alert-information.component.scss',
})
export class AlertInformationComponent {
  @Input() description = '';
}
