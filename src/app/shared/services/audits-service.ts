import { Injectable } from '@angular/core';
import { AuditLog } from '../models/models';
@Injectable({
  providedIn: 'root',
})
export class AuditsService {
  private mockedData :AuditLog [] = [
    { id: 1, timestamp: new Date('2026-01-10T09:30:00'), user: { id:1 ,name: 'John Deo', role: 'ceo', avatar: 'assets/img/profiles/avatar.png',department:'IT'}, action: 'create', module: 'rh_intern', objectName: 'Contract', status: 'success' },
    { id: 2, timestamp: new Date('2026-01-11T11:15:00'), user: { id:2,name: 'Sarah Mark', role: 'rh', avatar: 'assets/img/profiles/avatar.png' ,department:'Autre'}, action: 'update', module: 'rh_extern', objectName: 'Profile', status: 'success' },
    { id: 3, timestamp: new Date('2026-01-12T14:45:00'), user: { id:3,name: 'Mike Alami', role: 'manager', avatar: 'assets/img/profiles/avatar.png' ,department:'Sales'}, action: 'view', module: 'communication', objectName: 'Groupes', status: 'warning' },
    { id: 4, timestamp: new Date('2026-01-13T16:20:00'), user: { id:4,name: 'Fatima bousc', role: 'employee', avatar: 'assets/img/profiles/avatar.png' ,department:'Autre'}, action: 'delete', module: 'rh_intern', objectName: 'File', status: 'error' },
    { id: 5, timestamp: new Date('2026-01-14T08:45:00'), user: { id:5,name: 'Alami Ahmed', role: 'employee', avatar: 'assets/img/profiles/avatar.png' ,department:'Finance'}, action: 'login', module: 'system', objectName: 'Dashboard', status: 'success' }
  ];
  public getAllAudits():AuditLog[]{
    return this.mockedData;
  }
}
