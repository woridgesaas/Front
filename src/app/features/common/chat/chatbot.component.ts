import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from
  './services/chat.service';
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
  implements OnInit, OnDestroy,
             AfterViewChecked {

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef;

  isOpen    = false;
  isLoading = false;
  messages: ChatMessage[] = [];
  userInput = '';

  private shouldScroll = false;

  constructor(
    private chatService: ChatService
  ) {}

  // ───────────────── INIT ─────────────────
  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {}

  // ───────────────── UI ─────────────────
  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shouldScroll = true;
    }
  }

  closeChat(): void {
    this.isOpen = false;
  }

  // ───────────────── CHAT ─────────────────
  sendMessage(): void {
    const question = this.userInput.trim();
    if (!question || this.isLoading) return;

    // Message utilisateur
    this.messages.push({
      id:        this.generateId(),
      content:   question,
      sender:    'user',
      timestamp: new Date()
    });

    this.userInput    = '';
    this.isLoading    = true;
    this.shouldScroll = true;

    // Seulement la question
    // Kong injecte userId, role, tenant
    const request: ChatRequest = {
      question: question
    };

    this.chatService.sendMessage(request)
      .subscribe({
        next: (response) => {
          this.messages.push({
            id:         this.generateId(),
            content:    response.data.answer,
            sender:     'bot',
            timestamp:  new Date(),
            intent:     response.data.intent,
            confidence:
              response.data.confidence
          });

          this.isLoading    = false;
          this.shouldScroll = true;
        },
        error: () => {
          this.messages.push({
            id:        this.generateId(),
            content:
              "Désolé, une erreur s'est "
              + "produite. Veuillez réessayer.",
            sender:    'bot',
            timestamp: new Date()
          });

          this.isLoading    = false;
          this.shouldScroll = true;
        }
      });
  }

  // ───────────────── ENTER KEY ─────────────────
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter'
          && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // ───────────────── SUGGESTIONS ─────────────────
  get suggestions(): string[] {
    return [
      'Mon solde de congé',
      'Ma fiche de paie',
      'Statistiques RH',
      'Absences aujourd\'hui'
    ];
  }

  useSuggestion(s: string): void {
    this.userInput = s;
    this.sendMessage();
  }

  // ───────────────── RESET ─────────────────
  clearChat(): void {
    this.messages = [];
    this.addWelcomeMessage();
  }

  private addWelcomeMessage(): void {
    this.messages.push({
      id:        this.generateId(),
      content:
        'Bonjour ! Je suis votre assistant '
        + 'Woridge 🤖. Posez-moi vos questions.',
      sender:    'bot',
      timestamp: new Date()
    });
  }

  // ───────────────── SCROLL ─────────────────
  private scrollToBottom(): void {
    try {
      const el =
        this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }

  // ───────────────── UTILS ─────────────────
  private generateId(): string {
    return Date.now().toString(36)
      + Math.random().toString(36).substring(2);
  }
}