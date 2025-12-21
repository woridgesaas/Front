import { Injectable } from '@angular/core';
import { ChatContact, ChatMessage } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
   private currentUser = {
    id: 1,
    name: 'Vous',
    avatar: 'assets/img/profiles/avatar-14.jpg',
    role: 'Développeur',
    department: 'IT'
  };

  // Contacts mockes
  private contacts: ChatContact[] = [
    {
      id: 1,
      name: 'Anthony Lewis',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Chef de projet',
      department: 'IT',
      status: 'online',
      lastMessage: 'Salut, tu as vu le nouveau projet ?',
      lastMessageTime: '08:30',
      unreadCount: 3,
      isPinned: true
    },
    {
      id: 2,
      name: 'Elliot Murray',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Designer UI/UX',
      department: 'Design',
      status: 'online',
      lastMessage: 'J\'ai envoyé les maquettes',
      lastMessageTime: 'Hier',
      unreadCount: 0,
      isPinned: true
    },
    {
      id: 3,
      name: 'Harvey Smith',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Développeur',
      department: 'IT',
      status: 'indisponible',
      lastMessage: 'La réunion est à 15h',
      lastMessageTime: '10:45',
      unreadCount: 1,
      isPinned: false
    },
    {
      id: 4,
      name: 'Lisa Martinez',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Responsable RH',
      department: 'Ressources Humaines',
      status: 'away',
      lastMessage: 'Merci pour le document',
      lastMessageTime: 'Lundi',
      unreadCount: 0,
      isPinned: false
    },
    {
      id: 5,
      name: 'Michael Chen',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Analyste',
      department: 'Business',
      status: 'offline',
      lastMessage: 'Les données sont prêtes',
      lastMessageTime: '12/01',
      unreadCount: 0,
      isPinned: false
    },
    {
      id: 6,
      name: 'Sophie Dubois',
      avatar: 'assets/img/profiles/avatar.png',
      role: 'Marketing Manager',
      department: 'Marketing',
      status: 'online',
      lastMessage: 'On se voit à la pause café ?',
      lastMessageTime: '11:20',
      unreadCount: 5,
      isPinned: true
    }
  ];

   // Messages mockes par conversation
  private messages: ChatMessage[] = [
    // Conversation avec Anthony (id: 1)
    {
      id: 1,
      senderId: 1,
      receiverId: 100,
      type: 'text',
      content: 'Salut ! Tu as vu le nouveau projet sur lequel on va travailler ?',
      time: '08:00',
      read: true,
      timestamp: new Date('2024-01-15T08:00:00')
    },
    {
      id: 2,
      senderId: 100,
      receiverId: 1,
      type: 'text',
      content: 'Pas encore, tu peux m\'en dire plus ?',
      time: '08:05',
      read: true,
      timestamp: new Date('2024-01-15T08:05:00')
    },
    {
      id: 3,
      senderId: 1,
      receiverId: 100,
      type: 'text',
      content: 'C\'est une application interne pour la gestion des congés',
      time: '08:10',
      read: true,
      timestamp: new Date('2024-01-15T08:10:00')
    },
    {
      id: 4,
      senderId: 1,
      receiverId: 100,
      type: 'file',
      content: 'document.pdf',
      fileName: 'specifications.pdf',
      fileSize: '2.4 MB',
      time: '08:15',
      read: false,
      timestamp: new Date('2024-01-15T08:15:00')
    },
    {
      id: 5,
      senderId: 100,
      receiverId: 1,
      type: 'text',
      content: 'Je regarde ça et je te fais un retour cet après-midi',
      time: '08:20',
      read: false,
      timestamp: new Date('2024-01-15T08:20:00')
    },

    // Conversation avec Elliot (id: 2)
    {
      id: 6,
      senderId: 2,
      receiverId: 100,
      type: 'text',
      content: 'J\'ai envoyé les maquettes finales sur le drive',
      time: '14:30',
      read: true,
      timestamp: new Date('2024-01-14T14:30:00')
    },
    {
      id: 7,
      senderId: 100,
      receiverId: 2,
      type: 'text',
      content: 'Parfait, je les télécharge et je commence l\'intégration',
      time: '14:35',
      read: true,
      timestamp: new Date('2024-01-14T14:35:00')
    },
    {
      id: 8,
      senderId: 2,
      receiverId: 100,
      type: 'image',
      content: 'assets/img/social/gallery-01.jpg',
      fileName: 'maquette-home.jpg',
      fileSize: '1.8 MB',
      time: '14:40',
      read: true,
      timestamp: new Date('2024-01-14T14:40:00')
    }
  ];
  constructor() { }
  getContacts(): ChatContact[] {
    return [...this.contacts];
  }
  getContactById(id: number): ChatContact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }
  getPinnedContacts(): ChatContact[] {
    return this.contacts.filter(contact => contact.isPinned);
  }
  getUnreadContacts(): ChatContact[] {
    return this.contacts.filter(contact => contact.unreadCount > 0);
  }
  searchContacts(query: string): ChatContact[] {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return this.getContacts();
    
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.department.toLowerCase().includes(searchTerm) ||
      contact.role.toLowerCase().includes(searchTerm)
    );
  }
  togglePinContact(contactId: number): void {
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.isPinned = !contact.isPinned;
    }
  }
  markAsRead(contactId: number): void {
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.unreadCount = 0;
      // Marquer les messages comme lus
      this.messages.forEach(msg => {
        if (msg.senderId === contactId && msg.receiverId === this.currentUser.id) {
          msg.read = true;
        }
      });
    }
  }
  // === METHODS POUR LES MESSAGES ===
  getMessages(contactId: number): ChatMessage[] {
    return this.messages.filter(message =>
      (message.senderId === contactId && message.receiverId === this.currentUser.id) ||
      (message.senderId === this.currentUser.id && message.receiverId === contactId)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  sendMessage(contactId: number, content: string, type: 'text' | 'file' | 'image' = 'text', fileName?: string, fileSize?: string): ChatMessage {
    const newMessage: ChatMessage = {
      id: this.messages.length + 1,
      senderId: this.currentUser.id,
      receiverId: contactId,
      type,
      content,
      fileName,
      fileSize,
      time: this.getCurrentTime(),
      read: false,
      timestamp: new Date()
    };

    this.messages.push(newMessage);
    
   
    const contact = this.contacts.find(c => c.id === contactId);
    if (contact) {
      contact.lastMessage = content;
      contact.lastMessageTime = 'À l\'instant';
      contact.unreadCount = 0; 
    }

    return newMessage;
  }
  sendFile(contactId: number, file: File): ChatMessage {
    const fileSize = this.formatFileSize(file.size);
    return this.sendMessage(
      contactId,
      file.name,
      'file',
      file.name,
      fileSize
    );
  }
  sendImage(contactId: number, imageUrl: string, fileName: string): ChatMessage {
    return this.sendMessage(
      contactId,
      imageUrl,
      'image',
      fileName,
      this.formatFileSize(1000000) // 1MB simulé
    );
  }
  getCurrentUser() {
    return { ...this.currentUser };
  }
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  simulateIncomingMessage(contactId: number, content: string): ChatMessage {
    const contact = this.contacts.find(c => c.id === contactId);
    if (!contact) {
      throw new Error('Contact non trouvé');
    }

    const newMessage: ChatMessage = {
      id: this.messages.length + 1,
      senderId: contactId,
      receiverId: this.currentUser.id,
      type: 'text',
      content,
      time: this.getCurrentTime(),
      read: false,
      timestamp: new Date()
    };

    this.messages.push(newMessage);
    
    
    contact.lastMessage = content;
    contact.lastMessageTime = 'À l\'instant';
    contact.unreadCount++;

    return newMessage;
  }
  getChatStats() {
    const totalMessages = this.messages.length;
    const unreadMessages = this.messages.filter(msg => 
      msg.receiverId === this.currentUser.id && !msg.read
    ).length;
    const activeConversations = new Set(
      this.messages.map(msg => 
        msg.senderId === this.currentUser.id ? msg.receiverId : msg.senderId
      )
    ).size;

    return {
      totalMessages,
      unreadMessages,
      activeConversations,
      totalContacts: this.contacts.length
    };
  }


}
