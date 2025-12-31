import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
@Component({
  selector: 'app-welcome-screen',
  imports: [RouterLink],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
})
export class WelcomeScreenComponent {
  routes=routes;
  @Input() activeTab: 'contacts' | 'groups' = 'contacts';
}
