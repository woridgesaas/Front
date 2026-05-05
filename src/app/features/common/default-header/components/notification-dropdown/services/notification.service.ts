// services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationItem } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  //  Passe par Kong + singulier comme dans kong.yml
  private api = `${process.env['NG_APP_GATEWAY_URL']}/api/notification`;

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(this.api);
  }

  markAsRead(notifId: number): Observable<void> {
    // PATCH /{id} — correspond à ton controller
    return this.http.patch<void>(`${this.api}/${notifId}`, {});
  }

  markAllAsRead(): Observable<void> {
    //  PATCH / — correspond à ton controller
    return this.http.patch<void>(this.api, {});
  }
}