import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings-sidebar-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-sidebar-item.component.html',
})
export class SettingsSidebarItemComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() route!: string;
}
