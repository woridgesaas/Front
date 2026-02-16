import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatContact, ChatGroupItem } from '../../../../../shared/models/models';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  @Input() activeTab: 'contacts' | 'groups' = 'contacts';
  @Input() selectedContact: ChatContact | null = null;
  @Input() selectedGroup: ChatGroupItem | null = null;
  @Input() currentUser: any = null;

  @Output() back = new EventEmitter<void>();
  @Output() manageGroup = new EventEmitter<void>();

  get selectedItem() {
    return this.activeTab === 'contacts' ? this.selectedContact : this.selectedGroup;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      online: 'En ligne',
      offline: 'Hors ligne',
    };
    return statusMap[status] || status;
  }
  onBackClick(): void {
    this.back.emit();
  }

  onManageGroupClick(): void {
    this.manageGroup.emit();
  }
}
