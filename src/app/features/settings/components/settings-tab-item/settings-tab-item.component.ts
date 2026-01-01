import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings-tab-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-tab-item.component.html',
})
export class SettingsTabItemComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() link!: string;
  @Input() exact = false;
  @Input() activeWhenStartsWith?: string;

  constructor(private router: Router) {}

  //* Active only for application settings section
  isActive(): boolean {
    const url = this.router.url;

    if (this.activeWhenStartsWith) {
      return url.startsWith(this.activeWhenStartsWith);
    }

    return this.exact ? url === this.link : url.startsWith(this.link);
  }
}
