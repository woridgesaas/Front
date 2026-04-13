import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ChatService }   from './services/chat.service';
import {
  ChatMessage,
  ChatRequest
} from './models/chat.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent
  implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef;

  isOpen    = false;
  isLoading = false;
  messages: ChatMessage[] = [];
  userInput = '';

  userId = '';
  role   = 'EMPLOYEE';
  tenant = 'dev-local';

  private shouldScroll = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.addWelcomeMessage();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {}

  //  Charger infos depuis JWT 

  // tenant géré par Kong X-Subdomain
  private loadUserInfo(): void {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      // sub = userId
      this.userId = payload.sub || '';

      
      this.role = payload.role || 'EMPLOYEE';

      // tenant = injecté par Kong X-Subdomain
     
      this.tenant = 'dev-local';

    } catch (e) {
      this.userId = '';
      this.role   = 'EMPLOYEE';
      this.tenant = 'dev-local';
    }
  }

  // ── Message de bienvenue selon rôle ──
  private addWelcomeMessage(): void {
    const isRh = this.role === 'HR'
              || this.role === 'ADMIN'
              || this.role === 'MANAGER';

    const text = isRh
      ? 'Bonjour ! Je suis votre assistant RH Woridge. ' +
        'Posez-moi vos questions sur les statistiques, ' +
        'les congés, le personnel...'
      : 'Bonjour ! Je suis votre assistant RH Woridge. ' +
        'Posez-moi vos questions sur votre solde de ' +
        'congé, votre fiche de paie...';

    this.messages.push({
      id:        this.generateId(),
      content:   text,
      sender:    'bot',
      timestamp: new Date()
    });
  }

  // ── Toggle panel ──
  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shouldScroll = true;
    }
  }

  closeChat(): void {
    this.isOpen = false;
  }

  // ── Envoyer message ──
  sendMessage(): void {
    const question = this.userInput.trim();
    if (!question || this.isLoading) return;

    this.messages.push({
      id:        this.generateId(),
      content:   question,
      sender:    'user',
      timestamp: new Date()
    });

    this.userInput    = '';
    this.isLoading    = true;
    this.shouldScroll = true;

    const request: ChatRequest = {
      question: question,
      userId:   this.userId,
      role:     this.role,
      tenant:   this.tenant
    };

    this.chatService.sendMessage(request).subscribe({
      next: (response) => {
        this.messages.push({
          id:         this.generateId(),
          content:    response.data.answer,
          sender:     'bot',
          timestamp:  new Date(),
          intent:     response.data.intent,
          confidence: response.data.confidence
        });
        this.isLoading    = false;
        this.shouldScroll = true;
      },
      error: () => {
        this.messages.push({
          id:        this.generateId(),
          content:   'Désolé, une erreur s\'est produite. ' +
                     'Veuillez réessayer.',
          sender:    'bot',
          timestamp: new Date()
        });
        this.isLoading    = false;
        this.shouldScroll = true;
      }
    });
  }

  // ── Enter pour envoyer ──
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // ── Suggestions selon rôle ──
  get suggestions(): string[] {
    const isRh = this.role === 'HR'
              || this.role === 'ADMIN'
              || this.role === 'MANAGER';

    if (isRh) {
      return [
        'Combien d\'absents aujourd\'hui ?',
        'Masse salariale ce mois',
        'Statistiques des congés'
      ];
    }
    return [
      'Mon solde de congé',
      'Ma fiche de paie',
      'Règlement intérieur'
    ];
  }

  useSuggestion(s: string): void {
    this.userInput = s;
    this.sendMessage();
  }

  // ── Vider conversation ──
  clearChat(): void {
    this.messages = [];
    this.addWelcomeMessage();
  }

  // ── Scroll bas ──
  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }

  // ── ID unique ──
  private generateId(): string {
    return Date.now().toString(36)
         + Math.random().toString(36).substring(2);
  }
}