import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-managers-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './managers-table.component.html',
})
export class ManagersTableComponent {
  managers = [
    { name: 'Anthony Lewis', dept: 'Finance' },
    { name: 'Brian Villalobos', dept: 'Développement' },
    { name: 'Doglas Martini', dept: 'Management' },
  ];
}
