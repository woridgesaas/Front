import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-header.component.html',
})
export class SettingsHeaderComponent {
  @Input() title!: string;
  @Input() description?: string;
  @Input() icon?: string;
}
