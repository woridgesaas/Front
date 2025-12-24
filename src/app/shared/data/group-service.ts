import { Injectable } from '@angular/core';
import { ChatGroup } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  //  mockes pour les groupes
  private groups: ChatGroup[] = [
    {
      id: 1,
      name: 'IT - Département Technique',
      description: 'Groupe officiel du département informatique',
      createdBy: {
        id: 101,
        name: 'Richard Smith',
        avatar: 'assets/img/profiles/avatar-03.jpg'
      },
      createdAt: new Date('2024-01-10'),
      status: 'actif',
      memberCount: 15,
      members: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],
      type: 'department',
      lastActivity: new Date('2024-01-20'),
    },
    {
      id: 2,
      name: 'Projet Alpha',
      description: 'Groupe de travail pour le développement du projet Alpha',
      createdBy: {
        id: 102,
        name: 'Sophie Martin',
        avatar: 'assets/img/profiles/avatar-05.jpg'
      },
      createdAt: new Date('2024-01-15'),
      status: 'actif',
      memberCount: 8,
      members: [101, 102, 103, 104, 105, 106, 107, 108],
      type: 'department',
      lastActivity: new Date('2024-01-19'),
    },
    {
      id: 3,
      name: 'Annonces Officielles',
      description: 'Toutes les annonces importantes de l\'entreprise',
      createdBy: {
        id: 103,
        name: 'Admin System',
        avatar: 'assets/img/profiles/avatar-01.jpg'
      },
      createdAt: new Date('2023-12-01'),
      status: 'actif',
      memberCount: 45,
      members: Array.from({length: 45}, (_, i) => i + 1),
      type: 'announcement',
      lastActivity: new Date('2024-01-18'),
      
    },
    {
      id: 4,
      name: 'Événements & Sorties',
      description: 'Organisation des événements et sorties d\'entreprise',
      createdBy: {
        id: 104,
        name: 'Lisa Martinez',
        avatar: 'assets/img/profiles/avatar-09.jpg'
      },
      createdAt: new Date('2024-01-05'),
      status: 'actif',
      memberCount: 22,
      members: [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125],
      type: 'department',
      lastActivity: new Date('2024-01-17')
    },
    {
      id: 5,
      name: 'Ancien Projet Beta',
      description: 'Groupe du projet Beta (terminé)',
      createdBy: {
        id: 101,
        name: 'Richard Smith',
        avatar: 'assets/img/profiles/avatar-03.jpg'
      },
      createdAt: new Date('2023-11-20'),
      status: 'fermé',
      memberCount: 6,
      members: [101, 102, 103, 104, 105, 106],
      type: 'department',
      lastActivity: new Date('2023-12-15')
    },
    {
      id: 6,
      name: 'Support Technique',
      description: 'Support et assistance technique interne',
      createdBy: {
        id: 106,
        name: 'Michael Chen',
        avatar: 'assets/img/profiles/avatar-07.jpg'
      },
      createdAt: new Date('2024-01-12'),
      status: 'actif',
      memberCount: 12,
      members: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      type: 'department',
      lastActivity: new Date('2024-01-20')
    },
    {
      id: 7,
      name: 'Archives 2023',
      description: 'Archives des discussions 2023',
      createdBy: {
        id: 103,
        name: 'Admin System',
        avatar: 'assets/img/profiles/avatar-01.jpg'
      },
      createdAt: new Date('2023-01-01'),
      status: 'fermé',
      memberCount: 0,
      members: [],
      type: 'department',
      lastActivity: new Date('2023-12-31')
    }
  ];
  constructor() { }
  getAllGroups(): ChatGroup[] {
    return [...this.groups];
  }
  getGroupsByStatus(status: ChatGroup['status'] | 'all'): ChatGroup[] {
    if (status === 'all') {
      return this.getAllGroups();
    }
    return this.groups.filter(group => group.status === status);
  }
  getGroupById(id: number): ChatGroup | undefined {
    return this.groups.find(group => group.id === id);
  }
  searchGroups(query: string): ChatGroup[] {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return this.getAllGroups();
    
    return this.groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm) ||
      group.description.toLowerCase().includes(searchTerm) ||
      group.createdBy.name.toLowerCase().includes(searchTerm)
    );
  }
  //Filter par type
  filterByType(type: ChatGroup['type']): ChatGroup[] {
    return this.groups.filter(group => group.type === type);
  }
  //Filter par createdAt
  filterByDateRange(startDate: Date, endDate: Date): ChatGroup[] {
    return this.groups.filter(group => {
      const groupDate = group.createdAt;
      return groupDate >= startDate && groupDate <= endDate;
    });
  }
   // === GESTION (admin) ===
    createGroup(groupData: Partial<ChatGroup>): ChatGroup {
    const creator = { id: 101, name: 'Zakariyae.ha', avatar: 'assets/img/profiles/avatar-03.jpg' };
    if (!creator) {
      throw new Error('Créateur non trouvé');
    }

    const newGroup: ChatGroup = {
      id: 1, //just test fake id
      name: groupData.name || 'Nouveau groupe',
      description: groupData.description || '',
      createdBy: {
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar
      },
      createdAt: new Date(),
      status: 'actif',
      memberCount: groupData.members ? groupData.members.length : 1,
      members: groupData.members || [1], //1 => id de creator de group just simuler parceque le creator est un membre automatiqument
      type: groupData.type || 'department',
      lastActivity: new Date(),
     
    };

    this.groups.push(newGroup);
    return newGroup;
  }
  updateGroup(id: number, updates: Partial<ChatGroup>): ChatGroup | null {
    const index = this.groups.findIndex(g => g.id === id);
    if (index === -1) return null;

    this.groups[index] = {
      ...this.groups[index],
      ...updates
    };

    return this.groups[index];
  }
  deleteGroup(id: number): boolean {
    const initialLength = this.groups.length;
    this.groups = this.groups.filter(group => group.id !== id);
    return this.groups.length < initialLength;
  }
    changeGroupStatus(id: number, newStatus: ChatGroup['status']): boolean {
    const group = this.getGroupById(id);
    if (!group) return false;

    group.status = newStatus;
    return true;
  }
  addMembers(groupId: number, memberIds: number[]): boolean {
    const group = this.getGroupById(groupId);
    if (!group) return false;

   
    const uniqueNewMembers = memberIds.filter(id => !group.members.includes(id));
    group.members.push(...uniqueNewMembers);
    group.memberCount = group.members.length;
    
    return true;
  }
  removeMembers(groupId: number, memberIds: number[]): boolean {
    const group = this.getGroupById(groupId);
    if (!group) return false;
    group.members = group.members.filter(memberId => !memberIds.includes(memberId));
    group.memberCount = group.members.length;
    
    return true;
  }
  // === methods UTILITAIRES ===
  getGroupStats() {
    const totalGroups = this.groups.length;
    const activeGroups = this.groups.filter(g => g.status === 'actif').length;
    const closedGroups = this.groups.filter(g => g.status === 'fermé').length;
    const totalMembers = this.groups.reduce((sum, group) => sum + group.memberCount, 0);

    const typeStats = {
      department: this.groups.filter(g => g.type === 'department').length,
      announcement: this.groups.filter(g => g.type === 'announcement').length
    };

    return {
      totalGroups,
      activeGroups,
      closedGroups,
      totalMembers,
      typeStats
    };
  }
  getRecentlyActiveGroups(limit: number = 5): ChatGroup[] {
    return [...this.groups]
      .filter(g => g.lastActivity)
      .sort((a, b) => (b.lastActivity!.getTime() - a.lastActivity!.getTime()))
      .slice(0, limit);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  formatRelativeDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    
    return this.formatDate(date);
  }
  //icon par type de groupe
  getGroupTypeIcon(type: string): string {
    switch (type) {
      case 'department': return 'ti ti-building';
      case 'announcement': return 'ti ti-megaphone';
      default: return 'ti ti-folder';
    }
  }
  //badge couleur par status aussi
  getStatusBadgeClass(status: any): string {
    switch (status) {
      case 'actif': return 'badge-success';
      case 'fermé': return 'badge-secondary';
      default: return 'badge-light';
    }
  }
}
