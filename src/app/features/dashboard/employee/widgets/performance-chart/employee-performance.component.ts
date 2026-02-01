import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-performance.component.html',
})
export class TeamMembersComponent {
  members: TeamMember[] = [
    {
      name: 'Alexander Jermai',
      role: 'Designer UI/UX',
      avatar: 'assets/img/users/user-27.jpg',
    },
    {
      name: 'Doglas Martini',
      role: 'Designer produit',
      avatar: 'assets/img/users/user-42.jpg',
    },
    {
      name: 'Daniel Esbella',
      role: 'Chef d’équipe',
      avatar: 'assets/img/users/user-11.jpg',
    },
    {
      name: 'Stephan Peralt',
      role: 'Chef d’équipe',
      avatar: 'assets/img/users/user-44.jpg',
    },
  ];

  call(member: TeamMember) {
    console.log('Call:', member.name);
  }

  mail(member: TeamMember) {
    console.log('Mail:', member.name);
  }

  chat(member: TeamMember) {
    console.log('Chat:', member.name);
  }
}
