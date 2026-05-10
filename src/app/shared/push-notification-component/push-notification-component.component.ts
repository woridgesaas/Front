import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from '../models/models';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../layout/default-header/components/notification-dropdown/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-push-notification-component',
  imports: [CommonModule],
  templateUrl: './push-notification-component.component.html',
  styleUrl: './push-notification-component.component.scss',
})
export class PushNotificationComponentComponent implements OnInit, OnDestroy {
    notifications: (Notification & { progress: number; timerId?: any })[] = [];

  private subscription : Subscription | null=null;
  private audio : HTMLAudioElement | null=null;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.audio = new Audio('/assets/audio/push-audio.wav');
     this.audio.load();
    this.subscription = this.notificationService.notifications$.subscribe(notif => {
      this.notifications.push(notif);
      this.playSound();
      setTimeout(() => this.close(notif), 7000);
    });
  }

  close(notif: any) {
    const index = this.notifications.indexOf(notif);
    if (index > -1) this.notifications.splice(index, 1);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  getDisplayTitle(notification: Notification): string {
    const map: Record<string, string> = {
      'Leave/LeaveApproved': 'Congé approuvé',
      'Leave/LeaveRejected': 'Congé refusé',
      'Department/EmployeeDepartmentChanged': 'Changement de département',
      'Task/TaskAssigned': 'Nouvelle tâche'
    };
    return map[notification.title] || notification.title.split('/').pop()?.replace(/([A-Z])/g, ' $1') || notification.title;
  }
  //Audio
  private playSound() {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.audio.play().catch(error => {
        console.warn('Impossible de jouer le son:', error);
      });
    }
  }
  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diff < 1) return 'à l\'instant';
    if (diff < 60) return `il y a ${diff} min`;
    if (diff < 1440) return `il y a ${Math.floor(diff / 60)} h`;
    return `il y a ${Math.floor(diff / 1440)} j`;
  }
  getIcon(notification: Notification): string {
    switch (notification.type) {
      case 'INFO': return 'info';
      case 'SUCCESS': return 'check_circle';
      case 'WARNING': return 'warning';
      case 'ERROR': return 'error';
      default: return 'notifications';
    }
  }
  getIconColor(notification: Notification): string {
    switch (notification.type) {
      case 'SUCCESS': return '#28a745';
      case 'WARNING': return '#fd7e14';
      case 'ERROR': return '#dc3545';
      default: return '#A631D8';
    }
  }
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'HIGHT':
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      default:
        return 'priority-normal';
    }
  }
  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'HIGHT':
        return '🔴';
      case 'HIGH':
        return '🔴';
      case 'MEDIUM':
        return '🟠';
      case 'LOW':
        return '🔵';
      default:
        return '🔔';
    }
  }


  private camelCaseToPhrase(text: string): string {
    // Séparer les mots avant les majuscules
    const result = text.replace(/([A-Z])/g, ' $1');
    
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }
  private startAutoClose(notification: any) {
    const duration = 6000; // 6 secondes
    const interval = 50;    
    const step = (interval / duration) * 100;

    notification.timerId = setInterval(() => {
      notification.progress -= step;
      if (notification.progress <= 0) {
        clearInterval(notification.timerId);
        this.close(notification);
      }
    }, interval);
  }
 }
