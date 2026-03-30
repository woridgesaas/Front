import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Department } from "../../../../shared/models/models";
import { Post } from "../../models/post/post.model";
import { CreateUserRequest } from "../../models/user/create-user.model";
import { GetAllUserResponse } from "../../models/user/get-all-user.model";
import { EmployeeProfileResponse } from "../../models/user/employee-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl = 'http://localhost:8000/api/internal-users';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/departments`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<any>(`${this.baseUrl}/posts`).pipe(
      map(res => res.data)
    );
  }

  createUser(payload: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}/user`, payload);
  }

  getAllUsers(): Observable<GetAllUserResponse[]> {
    return this.http.get<GetAllUserResponse[]>(`${this.baseUrl}/user`);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${id}`);
  }
  getProfile(id: string): Observable<EmployeeProfileResponse> {
  return this.http.get<EmployeeProfileResponse>(`${this.baseUrl}/user/${id}`);
}
}
