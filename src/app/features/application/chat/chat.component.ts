import { Component, OnInit } from '@angular/core';
import {
  ChatContact,
  ChatGroupItem,
  ChatMessage,
} from '../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { ChatService } from '../../../shared/data/chat-service';
import { FormsModule } from '@angular/forms';
import { routes } from '../../../shared/routes/routes';
import { DetailsGroupModalComponent } from './components/details-group-modal/details-group-modal.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatFooterComponent } from './components/chat-footer/chat-footer.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    CommonModule,
    NgScrollbarModule,
    BreadcrumbsComponent,
    FormsModule,
    DetailsGroupModalComponent,
    ContactsListComponent,
    GroupsListComponent,
    WelcomeScreenComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatFooterComponent
  ],
})
export class ChatComponent implements OnInit {
   routes = routes;
  currentUser = {
    id: 0,
    name: '',
    avatar: '',
  };

  // Données
  contacts: ChatContact[] = [];
  groups: ChatGroupItem[] = [];

  // Sélection
  activeTab: 'contacts' | 'groups' = 'contacts';
  selectedContact: ChatContact | null = null;
  selectedGroup: ChatGroupItem | null = null;

  // Messages
  messages: ChatMessage[] = [];
  newMessage: string = '';

  // Filtres
  searchQuery: string = '';
  activeFilter: 'all' | 'unread' = 'all';

  // États
  isSidebarVisible: boolean = true;
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {}

  get selectedItem(): any {
    return this.activeTab === 'contacts' ? this.selectedContact : this.selectedGroup;
  }

  ngOnInit(): void {
    this.initChat();
  }

  private initChat(): void {
    this.currentUser = this.chatService.getCurrentUser();
    this.loadItems();
    this.simulateIncomingMessage();
  }

  /** === GESTION DES ONGLETS === */
  switchTab(tab: 'contacts' | 'groups'): void {
    this.activeTab = tab;
    this.selectedContact = null;
    this.selectedGroup = null;
    this.messages = [];
  }

  /** === CHARGEMENT DES DONNES === */
  private loadItems(): void {
    this.contacts = this.chatService.getContacts();
    this.groups = this.getMockGroups();
  }

  /** === events emiter depuis fils :) === */
  onContactSelected(contact: ChatContact): void {
    this.selectedContact = contact;
    this.selectedGroup = null;
    this.loadContactMessages(contact.id);
    this.chatService.markAsRead(contact.id);
    
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }

  onGroupSelected(group: ChatGroupItem): void {
    this.selectedGroup = group;
    this.selectedContact = null;
    this.loadGroupMessages(group.id);
    
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }
  //mesg emiter par le chat-footer :)
  onMessageSent(event:string):void{
    this.newMessage = event;
    this.sendMessage();
  }
  onEnterKeyPressed(event:string):void{
    this.newMessage = event;
    this.onEnterPress();
  }

  /** === GESTION DES MESSAGES === */
  private loadContactMessages(contactId: number): void {
    this.messages = this.chatService.getMessages(contactId);
  }

  private loadGroupMessages(groupId: number): void {
    this.messages = this.getMockGroupMessages(groupId);
  }

  sendMessage(): void {
    console.log(this.newMessage);
    
    const selectedItem = this.selectedItem;
    if (!selectedItem || !this.newMessage.trim()) return;

    if (this.activeTab === 'contacts') {
      // Message 1-to-1
      this.chatService.sendMessage(selectedItem.id, this.newMessage.trim());
      this.loadContactMessages(selectedItem.id);
    } else {
      // Message de groupe (simulation)
      this.messages.push({
        id: Date.now(),
        senderId: this.currentUser.id,
        receiverId: selectedItem.id,
        type: 'text',
        content: this.newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        timestamp: new Date()
      });
    }

    this.newMessage = '';
    console.log(this.newMessage);
    
  }

  onEnterPress(): void {
    this.sendMessage();
  }

  /** === SIMULATION GROUPES === */
  private getMockGroups(): ChatGroupItem[] {
    return [
      {
        id: 100,
        name: 'IT - Département',
        avatar: 'assets/img/group/avatar.jpg',
        type: 'group',
        memberCount: 15,
        description: 'Discussions techniques',
        unreadCount: 3,
      },
      {
        id: 101,
        name: 'Projet Alpha',
        type: 'group',
        memberCount: 8,
        description: 'Suivi du projet',
        unreadCount: 0,
      },
      {
        id: 102,
        name: 'Annonces Officielles',
        type: 'group',
        memberCount: 45,
        description: 'Toutes les annonces importantes',
        unreadCount: 1,
      },
    ];
  }

  private getMockGroupMessages(groupId: number): ChatMessage[] {
    return [
      {
        id: 1,
        senderId: 101,
        receiverId: groupId,
        type: 'text',
        content: 'Bonjour à tous dans le groupe !',
        time: '10:30',
        read: true,
        timestamp: new Date(),
      },
      {
        id: 2,
        senderId: this.currentUser.id,
        receiverId: groupId,
        type: 'text',
        content: 'Salut tout le monde !',
        time: '10:35',
        read: true,
        timestamp: new Date(),
      },
    ];
  }

  /** === HELPERS === */

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  deselectItem(): void {
    this.selectedContact = null;
    this.selectedGroup = null;
    this.messages = [];
    this.isSidebarVisible = true;
  }

  /** === SIMULATION MESSAGES === */
  private simulateIncomingMessage(): void {
    setTimeout(() => {
      const availableContacts = this.contacts.filter(
        (c) => c.status === 'online' && c.id !== this.selectedContact?.id
      );

      if (availableContacts.length > 0) {
        const randomContact = availableContacts[Math.floor(Math.random() * availableContacts.length)];
        const messages = ['Salut !', 'Tu as une minute ?', 'La réunion est à 15h'];

        this.chatService.simulateIncomingMessage(
          randomContact.id,
          messages[Math.floor(Math.random() * messages.length)]
        );

        this.contacts = this.chatService.getContacts();
      }
    }, 5000);
  }
 openGroupManagement(): void {
    const modalElement = document.getElementById('detailsGroupModal');
  
  if (modalElement) {
    alert(modalElement)
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }
    
    
  }
 
}
