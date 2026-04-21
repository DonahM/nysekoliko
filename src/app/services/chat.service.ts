import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserChat {
  idUser: number;
  name: string;
  surname: string;
  roles: string;
  logo: string;
  email: string;
}

export interface ChatMessage {
  idMsg?: number;
  senderId: number;
  receiverId: number;
  content: string;
  dateEnvoi?: string;
  isRead?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl + '/chat';

  constructor(private http: HttpClient) { }

  getUsers(userId: number, role: string): Observable<UserChat[]> {
    return this.http.get<UserChat[]>(`${this.apiUrl}/users?userId=${userId}&role=${role}`);
  }

  getMessages(user1: number, user2: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages?user1=${user1}&user2=${user2}`);
  }

  sendMessage(data: { senderId: number; receiverId: number; content: string }): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/send`, data);
  }

  getUnreadCount(userId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/unread-count?userId=${userId}`);
  }

  markAsRead(currentUserId: number, otherUserId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mark-read`, { currentUserId, otherUserId });
  }
}
