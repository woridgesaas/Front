import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }
  constructor(private http: HttpClient) {}

  public getattendanceadmin(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-admin.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        }),
      );
  }

  public getattendanceemployee(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-employee.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        }),
      );
  }
}
