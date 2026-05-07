import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.scss',
})
export class HeaderSearchComponent {
  searchValue = '';

  clear(): void {
    this.searchValue = '';
  }
}

