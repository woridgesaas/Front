import {  Component, OnDestroy, OnInit } from '@angular/core';
import { breadCrumbItems, ChatContact, ChatMessage } from '../../../shared/models/models';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { ChatService } from '../../../shared/data/chat-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
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
  // static  data de l'utilisateur courant
  currentUser = {
    id: 0,
    name: '',
    avatar: ''
  };
  
  // Liste des contacts
  contacts: ChatContact[] = [];
  filteredContacts: ChatContact[] = [];
  
  // Contact sélectionné
  selectedContact: ChatContact | null = null;
  
  // Messages de la conversation courante
  messages: ChatMessage[] = [];
  
  // Nouveau message
  newMessage: string = '';
  
  // Recherche
  searchQuery: string = '';
  
  // Filtre actif
  activeFilter: 'all' | 'unread' = 'all';
  
  
  // États
  isSidebarVisible: boolean = true;
  isLoading: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.initChat();
  }

  /**
   * Initialiser le chat
   */
  private initChat(): void {
    // Récupérer l'utilisateur courant
    this.currentUser = this.chatService.getCurrentUser();
    
    // Charger les contacts
    this.loadContacts();
    
    // Simuler un message entrant après 5 secondes
    setTimeout(() => {
      this.simulateIncomingMessage();
    }, 5000);
  }

  /**
   * Charger les contacts
   */
  private loadContacts(): void {
    this.contacts = this.chatService.getContacts();
    this.filteredContacts = [...this.contacts];
  }

  /**
   * Sélectionner un contact
   */
  selectContact(contact: ChatContact): void {
    this.selectedContact = contact;
    
    // Charger les messages
    this.loadMessages(contact.id);
    
    // Marquer comme lu
    this.chatService.markAsRead(contact.id);
    
    // Mettre à jour le contact dans la liste
    this.updateContactInList(contact.id);
    
    // Sur mobile, cacher la sidebar
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }

  /**
   * Désélectionner un contact (pour mobile)
   */
  deselectContact(): void {
    this.selectedContact = null;
    this.messages = [];
    this.isSidebarVisible = true;
  }

  /**
   * Charger les messages d'un contact
   */
  private loadMessages(contactId: number): void {
    this.messages = this.chatService.getMessages(contactId);
  }

  /**
   * Envoyer un message
   */
  sendMessage(): void {
    if (!this.selectedContact || !this.newMessage.trim()) return;

    
    this.chatService.sendMessage(this.selectedContact.id, this.newMessage.trim());
    
   
    this.loadMessages(this.selectedContact.id);
    
    
    this.newMessage = '';
    
   
  }

  onEnterPress(event: any): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  /**
   * Joindre un fichier
   */
  attachFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      input.value = ''; 
    }
  }


  /**
   * Rechercher des contacts
   */
  searchContacts(): void {
    if (!this.searchQuery.trim()) {
      this.applyFilter(this.activeFilter);
      return;
    }
    
    this.filteredContacts = this.chatService.searchContacts(this.searchQuery);
  }

  /**
   * Appliquer un filtre
   */
  applyFilter(filter: 'all' | 'unread'): void {
    this.activeFilter = filter;
    
    switch (filter) {
      case 'all':
        this.filteredContacts = [...this.contacts];
        break;
      case 'unread':
        this.filteredContacts = this.chatService.getUnreadContacts();
        break;
    }
    
    this.searchQuery = '';
  }
  /**
   * Mettre à jour un contact dans la liste
   */
  private updateContactInList(contactId: number): void {
    const updatedContact = this.chatService.getContactById(contactId);
    if (updatedContact) {
      const index = this.contacts.findIndex(c => c.id === contactId);
      if (index !== -1) {
        this.contacts[index] = updatedContact;
      }
    }
  }

  /**
   * Télécharger un fichier
   */
  downloadFile(message: ChatMessage): void {
    if (message.type === 'file' || message.type === 'image') {
      // Simulation
      alert(`Téléchargement de "${message.fileName}"`);
    }
  }

  /**
   * Obtenir le statut en français
   */
  getStatusText(status: string): string {
    switch (status) {
      case 'online': return 'En ligne';
      case 'offline': return 'Hors ligne';
      case 'busy': return 'Occupé';
      case 'away': return 'Absent';
      default: return status;
    }
  }

  /**
   * Simuler un message entrant
   */
  private simulateIncomingMessage(): void {
    
    const availableContacts = this.contacts.filter(c => 
      c.id !== this.selectedContact?.id && c.status === 'online'
    );
    
    if (availableContacts.length > 0) {
      const randomContact = availableContacts[Math.floor(Math.random() * availableContacts.length)];
      const messages = [
        'Salut, tu as une minute ?',
        'La réunion est reportée à demain',
        'Peux-tu vérifier ce bug ?',
        'J\'ai envoyé le document demandé',
        'Disponible pour un appel rapide ?'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      this.chatService.simulateIncomingMessage(randomContact.id, randomMessage);
      
      
      this.updateContactInList(randomContact.id);
      this.applyFilter(this.activeFilter);
      
      // Notification
      if (Notification.permission === 'granted' && !document.hasFocus()) {
        new Notification(`Message de ${randomContact.name}`, {
          body: randomMessage,
          icon: randomContact.avatar
        });
      }
    }
  }

  /**
   * Basculer la visibilité de la sidebar (mobile)
   */
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  /**
   * Formater l'heure relative
   */
  formatRelativeTime(timeString: string): string {
    if (timeString === 'À l\'instant') return timeString;
    
    
    if (timeString.includes(':')) return timeString;
    return timeString;
  }
}
