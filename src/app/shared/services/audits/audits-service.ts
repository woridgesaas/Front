import { AuditLog } from '../../models/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuditLogResponse } from '../../models/models';
import { Observable,map } from 'rxjs';
import { ExportService } from '../export-service';
@Injectable({
  providedIn: 'root',
})
export class AuditsService {

  constructor(private http:HttpClient,private exporter:ExportService ){}
  private baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/v1/audits`;

  public getAllAudits(limit: number = 50, start?: string, end?: string):Observable<AuditLogResponse>{
    let params = new HttpParams().set('limit', limit.toString());
    if (start) params = params.set('startDate', start);
    if (end) params = params.set('endDate', end);
   return this.http.get<AuditLogResponse>(this.baseUrl, { params }).pipe(
      map(res => ({
        ...res,
        data: res.data.map(item => ({
          ...item,
          status: item.status.toLowerCase(),
          timestamp: new Date(Number(item.timestamp) / 1_000_000)
        }))
      }))
    );
  }

  public export(dataToExport: AuditLog[]): void {
    let fileName:string= `Audits_Woridge_${new Date().getTime()}`;
    const cleanData = dataToExport.map(item => ({
      Date: item.timestamp,
      Utilisateur: item.userMatricule,
      Role: item.userRole,
      Action: item.action,
      Module: item.serviceName,
      Cible_ID: item.targetId,
      Statut: item.status
    }));

    this.exporter.export(cleanData , fileName)
  }
}
