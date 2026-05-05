import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../../shared/models/api-response.models';
import {
  AddPostRequest,
  AddPostResponse,
  GetAllPostsResponse,
  GetSpecificPostResponse,
  UpdatePostRequest,
  UpdatePostStatusRequest,
} from '../models/post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly BASE_URL = `${process.env['NG_APP_GATEWAY_URL']}/api/internal-users/posts`;

  constructor(private http: HttpClient) {}

  addPost(payload: AddPostRequest): Observable<AddPostResponse> {
    return this.http
      .post<ApiResponse<AddPostResponse>>(this.BASE_URL, payload)
      .pipe(map((response) => response.data));
  }

  getAllPosts(): Observable<GetAllPostsResponse[]> {
    return this.http
      .get<ApiResponse<GetAllPostsResponse[]>>(this.BASE_URL)
      .pipe(map((response) => response.data));
  }

  getPostById(id: string): Observable<GetSpecificPostResponse> {
    return this.http
      .get<ApiResponse<GetSpecificPostResponse>>(`${this.BASE_URL}/${id}`)
      .pipe(map((response) => response.data));
  }

  updatePost(id: string, payload: UpdatePostRequest): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${id}`, payload);
  }

  updatePostStatus(id: string, payload: UpdatePostStatusRequest): Observable<void> {
    return this.http.patch<void>(`${this.BASE_URL}/${id}`, payload);
  }
}
