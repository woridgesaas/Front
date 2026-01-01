import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketBase } from '../../../../../shared/models/models';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { TicketService } from '../../../../../shared/services/ticket-service';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { TicketCreateComponent } from '../../components/ticket-create/ticket-create.component';
import { TicketDetailsModalComponent } from '../../components/ticket-details-modal/ticket-details-modal.component';
import { TicketListEmployeComponent } from '../../components/ticket-list-employe/ticket-list-employe.component';
import { Tick } from 'chart.js';
import { ConfirmDeleteComponent } from '../../../../common/delete-modal/delete-modal.component';
@Component({
  selector: 'app-tickets',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSortModule,
    CustomPaginationComponent,
    BreadcrumbsComponent,
    BsDatepickerModule,
    TicketCreateComponent,
    TicketDetailsModalComponent,
    TicketListEmployeComponent,
    ConfirmDeleteComponent
  ],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  bsRangeValue: Date[] = [];
  tickets: TicketBase[] = [];
  filteredTickets: TicketBase[] = [];
  //Handling selected ticket sent by child app-ticket-list-employe :)
  selectedTicket:TicketBase | null =null;
  //To pass to the delete modal
  ticketToDelete:TicketBase | null =null;
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalTickets: number = 0;

  // Filtre
  searchDataValue: string = '';
  initChecked: boolean = false;
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }
  loadTickets(): void {
    this.tickets = this.ticketService.getTicketsByEmployeId(1);
    this.filteredTickets = [...this.tickets];
    this.totalTickets = this.tickets.length;
  }
  //-----Pagination----------

  get totalPages(): number {
    return Math.ceil(this.totalTickets / this.pageSize);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  searchData(value: string): void {
    if (!value) {
      this.filteredTickets = [...this.tickets];
      return;
    }

    const searchTerm = value.toLowerCase();
    this.filteredTickets = this.tickets.filter(
      (ticket) =>
        ticket.titre.toLowerCase().includes(searchTerm) ||
        ticket.description?.toLowerCase().includes(searchTerm) ||
        ticket.numeroTicket.toLowerCase().includes(searchTerm) ||
        ticket.categorie.toLowerCase().includes(searchTerm)
    );
  }

  //delete just fermer ou resolu
  public deleteTicket(ticket: TicketBase): void {
    this.ticketToDelete = ticket;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement && (window as any).bootstrap) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  //call api to delete ..
  public confirmedDelete(event:any){
    alert("deleting ...");
  }
  // selection 3lalisr des id
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.filteredTickets.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.filteredTickets.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  getSelectedItems(): TicketBase[] {
    return this.filteredTickets.filter((item) => item.isSelected);
  }
  //-----------Filtrage is in the child .ts just emit the sortedTickets list to parrent-----------------

  onTicketSelected(ticket: TicketBase): void {
    this.selectedTicket = ticket;
    console.log(ticket);
    
    this.openDetailModal();
  }

  private openDetailModal(): void {
      const modalElement = document.getElementById('ticketDetailModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
  }
}
