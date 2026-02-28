// notification-dropdown.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification-dropdown/services/notification.service';
import { NotificationItem } from '../notification-dropdown/models/notification.model';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.scss',
})
export class NotificationDropdownComponent implements OnInit {

  notifications: NotificationItem[] = [];
  notificationsCount = 0;
  isLoading = false;
  error = '';

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.isLoading = true;
    this.notifService.getMyNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.notificationsCount = data.filter(n => !n.isRead).length;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les notifications';
        this.isLoading = false;
      }
    });
  }

 

  markAsRead(notif: NotificationItem): void {
    if (notif.isRead) return;
  
    // 1. Mettre à jour visuellement tout de suite (UX rapide)
    notif.isRead = true;
    this.notificationsCount = this.notifications.filter(n => !n.isRead).length;
  
    // 2. Sauvegarder en DB → au prochain refresh elle sera déjà lue
    this.notifService.markAsRead(notif.id).subscribe({
      error: () => {
        // Si erreur → annuler le changement visuel
        notif.isRead = false;
        this.notificationsCount = this.notifications.filter(n => !n.isRead).length;
      }
    });
  }
  
  markAllAsRead(): void {
    // 1. Visuellement
    this.notifications.forEach(n => n.isRead = true);
    this.notificationsCount = 0;
  
    // 2. En DB
    this.notifService.markAllAsRead().subscribe({
      error: () => this.loadNotifications() // si erreur → recharger l'état réel
    });
  }
}