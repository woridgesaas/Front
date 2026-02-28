// services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationItem } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private api = `${process.env['NG_APP_NOTIF_URL']}/api/notifications`;

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(this.api);
  }

  // appelle le backend → isRead = true en DB
  markAsRead(notifId: number): Observable<void> {
    return this.http.patch<void>(`${this.api}/${notifId}/read`, {});
  }

  // marque tout comme lu en DB
  markAllAsRead(): Observable<void> {
    return this.http.patch<void>(`${this.api}/read-all`, {});
  }
}