import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Holiday } from '../models/models';

@Injectable({ providedIn: 'root' })
export class HolidayService {

  constructor(private http: HttpClient) {}
getHolidayTemplates(): Observable<Holiday[]> {
  return this.http
    .get<Holiday[]>('assets/json/holidays.json')
    .pipe(
      map(data =>
        data.map(h => ({
          ...h,
          date: new Date(h.date)
        }))
      )
    );
}


  getHolidays(): Observable<Holiday[]> {
    return this.http
      .get<Holiday[]>('assets/json/holidays.json')
      .pipe(
        map((data: Holiday[]) =>
          data.map((h: Holiday) => ({
            ...h,
            date: new Date(h.date)
          }))
        )
      );
  }
}
