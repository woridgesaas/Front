// services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,Subject } from 'rxjs';
import { NotificationItem } from '../models/notification.model';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  //  Passe par Kong + singulier comme dans kong.yml
  private api = `${process.env['NG_APP_GATEWAY_URL']}/api/notification`;
  private hubConnection!: signalR.HubConnection;
  private notificationSubject = new Subject<any>();
  notifications$ = this.notificationSubject.asObservable();
  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(this.api);
  }

  markAsRead(notifId: number): Observable<void> {
   
    return this.http.patch<void>(`${this.api}/${notifId}`, {});
  }

  markAllAsRead(): Observable<void> {
    
    return this.http.patch<void>(this.api, {});
  }
   startConnection(): void {
   this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(`${this.api}/notificationHub`, {
    accessTokenFactory: () => localStorage.getItem('token') || ""
  })
  .withAutomaticReconnect()
  .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch(err => console.error('Error establishing SignalR connection: ', err));

    this.hubConnection.on('ReceiveNotification', (notification) => {
      console.log('Notification received:', notification);
      this.addNotification(notification);
    });
  }


  //when recieving a push notif :
  addNotification(notification: Notification) {
    this.notificationSubject.next(notification);
  }
}