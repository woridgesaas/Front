import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Holiday } from '../models/models';

@Injectable({ providedIn: 'root' })
export class HolidayService {

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<Holiday[]> {
    return this.http
      .get<any[]>('assets/json/holidays.json')
      .pipe(
        map(data =>
          data.map(h => ({
            ...h,
            date: new Date(h.date)
          }))
        )
      );
  }
}
