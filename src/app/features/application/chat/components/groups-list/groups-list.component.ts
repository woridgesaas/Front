import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatGroupItem } from '../../../../../shared/models/models';

@Component({
  selector: 'app-groups-list',
  imports: [],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent {
 @Input() groups: ChatGroupItem[] = [];
  @Input() selectedGroup: ChatGroupItem | null = null;
  @Input() searchQuery: string = '';
  
  @Output() groupSelected = new EventEmitter<ChatGroupItem>();
  @Output() groupDeselected = new EventEmitter<void>();

  get filteredGroups(): ChatGroupItem[] {
    if (!this.groups) return [];
    
    let filtered = [...this.groups];
    
    // Recherche texte
    if (this.searchQuery.trim()) {
      const term = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (g) =>
          g.name.toLowerCase().includes(term) ||
          (g.description?.toLowerCase().includes(term) || '')
      );
    }
    
    return filtered;
  }

  selectGroup(group: ChatGroupItem): void {
    this.groupSelected.emit(group);
  }
}
