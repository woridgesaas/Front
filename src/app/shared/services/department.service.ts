import { Injectable } from "@angular/core";
import { DataService } from "../data/data.service";
import { Department } from '../models/models';
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({ providedIn: 'root' })
export class DepartmentService {

  private baseUrl = 'http://localhost:8000/api/internal-users/departments';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Department[]>(this.baseUrl);
  }

  create(name: string, status: string) {
  return this.http.post(this.baseUrl, { name, status });
}

  update(id: string, name: string, status: string) {
  return this.http.patch(`${this.baseUrl}/${id}`, { name, status });
}
  
}
