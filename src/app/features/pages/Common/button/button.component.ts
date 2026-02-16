import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
routes= routes
}
