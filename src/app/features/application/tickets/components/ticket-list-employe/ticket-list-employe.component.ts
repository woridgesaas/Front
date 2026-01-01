import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketBase } from '../../../../../shared/models/models';
import { MatSortModule ,Sort ,MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-ticket-list-employe',
  imports: [FormsModule,CommonModule ,MatSortModule],
  templateUrl: './ticket-list-employe.component.html',
  styleUrl: './ticket-list-employe.component.scss',
})
export class TicketListEmployeComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() tickets:TicketBase[]=[];
  displayedTickets: TicketBase[] = []; 
  @Input() initChecked:boolean=false;


  @Output() ticketSelected = new EventEmitter<TicketBase>();  
  @Output() ticketDeleted = new EventEmitter<TicketBase>();   
  @Output() selectAllChanged = new EventEmitter<boolean>();
  @Output() sortedTickets = new EventEmitter<TicketBase[]>();

  onSortChange(sort: Sort): void {
    this.displayedTickets = this.sortTickets([...this.displayedTickets], sort);
  }
  ngOnChanges(): void { //appeler auto when @Input changes ;) cad parent changed the list of tickets
  this.displayedTickets = [...this.tickets];
  
  if (this.sort?.active) {
    this.onSortChange(this.sort);
  }
}
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  onViewDetails(ticket: TicketBase): void {
    this.ticketSelected.emit(ticket);
  }

  onDeleteTicket(ticket: TicketBase): void {
    this.ticketDeleted.emit(ticket);
  }
  onSelectAllChange(checked: boolean): void {
    this.selectAllChanged.emit(checked);
  }
  private sortTickets(tickets: TicketBase[], sort: Sort): TicketBase[] {
    if (!sort.active || sort.direction === '') {
      return tickets;
    }

    return tickets.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'numeroTicket':
          return this.compare(a.numeroTicket, b.numeroTicket, isAsc);
        case 'titre':
          return this.compare(a.titre, b.titre, isAsc);
        case 'categorie':
          return this.compare(a.categorie, b.categorie, isAsc);
        case 'priorite':
          return this.compare(a.priorite, b.priorite, isAsc);
        case 'statut':
          return this.compare(a.statut, b.statut, isAsc);
        case 'createdAt':
          return this.compareDates(a.createdAt.toString(), b.createdAt.toString(), isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareDates(dateA: string, dateB: string, isAsc: boolean): number {
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    return this.compare(dateObjA.getTime(), dateObjB.getTime(), isAsc);
  }
}
