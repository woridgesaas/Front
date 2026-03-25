import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../../../../shared/models/models";
import { Post } from "../../models/post/post.model";
import { CreateUserRequest } from "../../models/user/create-user.model";

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
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  createUser(payload: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}/user`, payload);
  }
}
