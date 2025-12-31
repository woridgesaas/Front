import { Component, Input } from '@angular/core';
import { ChatContact, ChatMessage } from '../../../../../shared/models/models';

@Component({
  selector: 'app-chat-messages',
  imports: [],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
})
export class ChatMessagesComponent{

  @Input() messages: ChatMessage[] = [];
  @Input() selectedContact: ChatContact | null = null;
  @Input() currentUser: any = null;
  @Input() activeTab: 'contacts' | 'groups' = 'contacts';
}
