import { Injectable } from "@angular/core";
import { DataService } from "../data/data.service";
import { department } from '../models/models';
import { map } from "rxjs";
@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private dataService: DataService) {}

getAll() {
  return this.dataService.getdepartments().pipe(
    map(res => res.data) 
  );
}

  delete(departments: department[], item: department): department[] {
    return departments.filter(d => d.Department !== item.Department);
  }
}
