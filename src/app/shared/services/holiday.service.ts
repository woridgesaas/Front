import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Holiday, HolidayRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class HolidayService {

  private readonly API_GATEWAY_URI = 'http://localhost:8000/api/internal-users/holidays';
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
    const currentYear = new Date().getFullYear().toString();

    //URL param ?year=20626
    const param = new HttpParams().set("year" , currentYear);
    return this.http.get<Holiday[]>(this.API_GATEWAY_URI,{params:param}).pipe(
      map(holidays=>{
        return holidays.map(holiday=>{
          holiday.date =new Date(holiday.date);
          return holiday;
        })
        
      })
    );
  }

  createHoliday(holiday:HolidayRequest):Observable<Holiday>{
    return this.http.post<Holiday>(this.API_GATEWAY_URI,holiday );
  }
}
