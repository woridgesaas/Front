import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpis.component.html',
  styleUrl:'./kpis.component.scss',
})
export class KpisComponent {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() color: string = 'primary';
}
