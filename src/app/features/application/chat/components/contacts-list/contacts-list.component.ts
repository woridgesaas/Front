import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatContact } from '../../../../../shared/models/models';

@Component({
  selector: 'app-contacts-list',
  imports: [],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {
 @Input() contacts: ChatContact[] = [];
  @Input() selectedContact: ChatContact | null = null;
  @Input() searchQuery: string = '';
  
  @Output() contactSelected = new EventEmitter<ChatContact>();
  @Output() contactDeselected = new EventEmitter<void>();

  get filteredContacts(): ChatContact[] {
    if (!this.contacts) return [];
    
    let filtered = [...this.contacts];
    
    // Recherche texte
    if (this.searchQuery.trim()) {
      const term = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          (c.department?.toLowerCase().includes(term) || '')
      );
    }
    
    return filtered;
  }

  selectContact(contact: ChatContact): void {
    this.contactSelected.emit(contact);
  }

  formatRelativeTime(timeString: string): string {
    if (timeString === "À l'instant") return timeString;
    return timeString;
  }
}
