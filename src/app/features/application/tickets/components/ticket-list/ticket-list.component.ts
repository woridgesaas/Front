import { Component ,OnInit , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';
import { TicketAdmin } from '../../../../../shared/models/models';
import { TicketService } from '../../../../../shared/data/ticket-service';
@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-list.component.html',
})

export class TicketListComponent {
  constructor(private ticketService : TicketService) {
    
  }
  @Input() tickets: TicketAdmin[] = [];
  routes = routes;
  
  ngOnInit(): void {
    // Utilise les tickets du parent s'ils existent, sinon les mocks
    if(!this.tickets || this.tickets.length === 0) {
      this.tickets = this.ticketService.getAllTickets();
    } 
  }
}
