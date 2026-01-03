import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss',
})
export class ChatButtonComponent {
  routes = routes;

  // badge dynamique si besoin plus tard
  @Input() unreadCount = 5;
}
