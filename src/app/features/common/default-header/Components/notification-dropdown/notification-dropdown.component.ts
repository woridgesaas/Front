import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.scss',
})
export class NotificationDropdownComponent {
  notificationsCount = 2;

  notifications = [
    {
      user: 'Shawn',
      avatar: 'assets/img/profiles/avatar-27.jpg',
      message: 'performance in Math is below the threshold.',
      time: 'Just Now',
      actions: false,
    },
    {
      user: 'Sylvia',
      avatar: 'assets/img/profiles/avatar-23.jpg',
      message: 'added appointment on 02:00 PM',
      time: '10 mins ago',
      actions: true,
    },
  ];
}
