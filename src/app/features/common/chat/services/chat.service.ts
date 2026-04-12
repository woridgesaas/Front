import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ChatRequest,
  ChatResponse
} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    const gatewayUrl =
      (import.meta as any).env['NG_APP_GATEWAY_URL']
      || 'http://localhost:8000';

    this.baseUrl = `${gatewayUrl}/api/chat`;
  }

  sendMessage(
    request: ChatRequest
  ): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(
      this.baseUrl,
      request
    );
  }
}