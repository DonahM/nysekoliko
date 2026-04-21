import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ChatService, UserChat, ChatMessage } from '../../services/chat.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatListModule, MatDividerModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  baseUrl = environment.apiUrl.replace('/api', ''); // Assumes apiUrl has /api
  
  currentUser: any = null;
  users: UserChat[] = [];
  filteredUsers: UserChat[] = [];
  selectedUser: UserChat | null = null;
  
  messages: ChatMessage[] = [];
  newMessage: string = '';
  searchQuery: string = '';
  
  refreshInterval: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.loadUsers();
    }
    
    // Auto-refresh chat every 5 seconds for a "live" feel
    this.refreshInterval = setInterval(() => {
      if (this.selectedUser) {
        this.loadMessages(this.selectedUser.idUser, false);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadUsers() {
    this.chatService.getUsers(this.currentUser.idUser, this.currentUser.roles).subscribe((res) => {
      this.users = res;
      this.filteredUsers = res;
    });
  }

  filterUsers() {
    if (!this.searchQuery) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(u => 
        (u.name?.toLowerCase().includes(this.searchQuery.toLowerCase())) || 
        (u.surname?.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }

  selectUser(user: UserChat) {
    this.selectedUser = user;
    this.loadMessages(user.idUser, true);
  }

  loadMessages(targetUserId: number, scrollDown: boolean = true) {
    this.chatService.getMessages(this.currentUser.idUser, targetUserId).subscribe((res) => {
      const prevLength = this.messages.length;
      this.messages = res;
      
      if (scrollDown || this.messages.length > prevLength) {
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
    
    // Mark messages as read when opening the conversation
    this.chatService.markAsRead(this.currentUser.idUser, targetUserId).subscribe();
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;
    
    const payload = {
      senderId: this.currentUser.idUser,
      receiverId: this.selectedUser.idUser,
      content: this.newMessage.trim()
    };
    
    // Optimistic UI update
    const dummyMsg: ChatMessage = {
      idMsg: Date.now(),
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      content: payload.content,
      dateEnvoi: new Date().toISOString()
    };
    this.messages.push(dummyMsg);
    this.scrollToBottom();
    
    const sentText = this.newMessage;
    this.newMessage = '';

    this.chatService.sendMessage(payload).subscribe({
      next: (res) => {
        // Re-load to get real ID and dates
        this.loadMessages(this.selectedUser!.idUser, true);
      },
      error: () => {
        // Revert message if failed
        this.messages = this.messages.filter(m => m.idMsg !== dummyMsg.idMsg);
        this.newMessage = sentText;
      }
    });
  }
  
  handleEnter(event: any) {
    event.preventDefault();
    this.sendMessage();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getAvatar(user: any): string {
    return user.logo ? `${this.baseUrl}/upload/users/${user.logo}` : '';
  }
}
