import {  Component, OnDestroy, OnInit } from '@angular/core';
import { breadCrumbItems, ChatContact, ChatGroupItem, ChatMessage, SelectedItem } from '../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { ChatService } from '../../../shared/data/chat-service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [CommonModule, NgScrollbarModule,
    BreadcrumbsComponent,
    FormsModule, RouterLink]
})
export class ChatComponent implements OnInit {
 breadCrumbItems: breadCrumbItems[] =[
   { label: 'Intranet' },
      { label: 'Chat', active: true }
 ];
 routes= routes;
  // Utilisateur courant { id: number; name: string; avatar: string } est le type des prop :)
  currentUser = {
    id: 0,
    name: '',
    avatar: ''
  };
  
  // Données
  contacts: ChatContact[] = [];
  groups: ChatGroupItem[] = [];
  filteredItems: any[] = []; // Contacts OU groupes selon l'onglet
  
  // Sélection
  activeTab: 'contacts' | 'groups' = 'contacts';
  selectedItem: any = null; // Peut être contact ou groupe
  
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
    this.selectedItem = null;
    this.searchItems();
  }

  /** === CHARGEMENT DES DONNES === */
  private loadItems(): void {
    this.contacts = this.chatService.getContacts();
    
    this.groups = this.getMockGroups();
    this.searchItems();
  }

  /** === RECHERCHE ET FILTRAGE === */
  searchItems(): void {
    if (this.activeTab === 'contacts') {
      this.filteredItems = this.filterContacts();
    } else {
      this.filteredItems = this.filterGroups();
    }
  }

  private filterContacts(): ChatContact[] {
    let result = [...this.contacts];
    
    if (this.activeFilter === 'unread') {
      result = result.filter(c => c.unreadCount > 0);
    }
    
    // Recherche texte
    if (this.searchQuery.trim()) {
      const term = this.searchQuery.toLowerCase().trim();
      result = result.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.department.toLowerCase().includes(term)
      );
    }
    
    return result;
  }

  private filterGroups(): ChatGroupItem[] {
    let result = [...this.groups];
    
    // Recherche texte
    if (this.searchQuery.trim()) {
      const term = this.searchQuery.toLowerCase().trim();
      result = result.filter(g =>
        g.name.toLowerCase().includes(term) ||
        g.description?.toLowerCase().includes(term)
      );
    }
    
    return result;
  }

  
  selectItem(item: any): void {
    this.selectedItem = item;
    if (this.activeTab === 'contacts') {
      this.loadContactMessages(item.id);
    } else {
      this.loadGroupMessages(item.id);
    }
    
    // Marquer comme lu si c'est un contact
    if (this.activeTab === 'contacts') {
      this.chatService.markAsRead(item.id);
    }
    
    // Cacher sidebar sur mobile
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }

  deselectItem(): void {
    this.selectedItem = null;
    this.messages = [];
    this.isSidebarVisible = true;
  }

  
  private loadContactMessages(contactId: number): void {
    this.messages = this.chatService.getMessages(contactId);
  }

  private loadGroupMessages(groupId: number): void {
    // Simulation de messages de groupe
    this.messages = this.getMockGroupMessages(groupId);
  }

  
  sendMessage(): void {
    if (!this.selectedItem || !this.newMessage.trim()) return;
    
    if (this.activeTab === 'contacts') {
      // Message 1-to-1
      this.chatService.sendMessage(this.selectedItem.id, this.newMessage.trim());
    } else {
      // Message de groupe (simulation)
      alert('Message de groupe envoyé:'+ this.newMessage);
    }
    
    // Recharger les messages
    if (this.activeTab === 'contacts') {
      this.loadContactMessages(this.selectedItem.id);
    } else {
      this.loadGroupMessages(this.selectedItem.id);
    }
    
    this.newMessage = '';
  }

  onEnterPress(event: any): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
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
        unreadCount: 3
      },
      {
        id: 101,
        name: 'Projet Alpha',
        type: 'group',
        memberCount: 8,
        description: 'Suivi du projet',
        unreadCount: 0
      },
      {
        id: 102,
        name: 'Annonces Officielles',
        type: 'group',
        memberCount: 45,
        description: 'Toutes les annonces importantes',
        unreadCount: 1
      }
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
        timestamp: new Date()
      },
      {
        id: 2,
        senderId: this.currentUser.id,
        receiverId: groupId,
        type: 'text',
        content: 'Salut tout le monde !',
        time: '10:35',
        read: true,
        timestamp: new Date()
      }
    ];
  }

  /** === HAllpers === */
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'online': 'En ligne',
      'offline': 'Hors ligne',
    };
    return statusMap[status] || status;
  }

  formatRelativeTime(timeString: string): string {
    if (timeString === 'À l\'instant') return timeString;
    return timeString;
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  /** === ACTIONS === */
  attachFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      console.log('Fichier joint:', input.files[0].name);
      input.value = '';
    }
  }

  downloadFile(message: ChatMessage): void {
    if (message.type === 'file' || message.type === 'image') {
      alert(`Téléchargement de "${message.fileName}"`);
    }
  }

  private simulateIncomingMessage(): void {
    setTimeout(() => {
      const availableContacts = this.contacts.filter(c => 
        c.status === 'online' && c.id !== this.selectedItem?.id
      );
      
      if (availableContacts.length > 0) {
        const randomContact = availableContacts[Math.floor(Math.random() * availableContacts.length)];
        const messages = ['Salut !', 'Tu as une minute ?', 'La réunion est à 15h'];
        
        this.chatService.simulateIncomingMessage(
          randomContact.id, 
          messages[Math.floor(Math.random() * messages.length)]
        );
        
        this.searchItems(); // Rafraîchir la liste
      }
    }, 5000);
  }

  /** === ACTIONS GROUPES (admin) === */
  isGroupAdmin(): boolean {
      console.log('currentUser.id:', this.currentUser.id, typeof this.currentUser.id);
    // Simulation
    return this.currentUser.id === 1;
  }

  manageGroupMembers(): void {
    if (this.activeTab === 'groups' && this.selectedItem) {
      alert('Gérer les membres du groupe:'+ this.selectedItem.name);
      // Ouvrir modal de gestion
    }
  }

  openGroupSettings(): void {
    if (this.activeTab === 'groups' && this.selectedItem) {
      alert('Paramètres du groupe:'+ this.selectedItem.name);
      // Ouvrir modal de paramètres
    }
  }
}
