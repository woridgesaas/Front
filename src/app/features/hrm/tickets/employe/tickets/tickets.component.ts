import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { breadCrumbItems, TicketBase } from '../../../../../shared/models/models';
import { BreadcrumbsComponent } from '../../../../common/breadcrumbs/breadcrumbs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { CustomPaginationComponent } from '../../../../../shared/custom-pagination/custom-pagination.component';
import { TicketService } from '../../../../../shared/data/ticket-service';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { TicketCreateComponent } from '../../components/ticket-create/ticket-create.component';
import { TicketDetailsModalComponent } from '../../components/ticket-details-modal/ticket-details-modal.component';
@Component({
  selector: 'app-tickets',
  imports: [CommonModule,
      FormsModule,
      RouterModule,
      MatSortModule,
      CustomPaginationComponent,
      BreadcrumbsComponent,
      BsDatepickerModule,
      TicketCreateComponent,
      TicketDetailsModalComponent
      ],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  breadCrumbItems: breadCrumbItems[] =[
      { label: 'Employee' },
      { label: 'Tickets' },
      { label: 'Mes Tickets', active: true }
  ];
  bsRangeValue: Date[] = [];
  tickets: TicketBase[] = [];
  filteredTickets: TicketBase[] = [];
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalTickets: number = 0;
  
  // Filtre
  searchDataValue: string = '';
  initChecked: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private ticketService: TicketService,
  ) {}

  ngOnInit():void{
    this.loadTickets();
  }
  loadTickets(): void {
   
    this.tickets = this.ticketService.getTicketsByEmployeId(1);
    this.filteredTickets = [...this.tickets];
    this.totalTickets = this.tickets.length;
  }
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.titre.toLowerCase().includes(searchTerm) ||
      ticket.description?.toLowerCase().includes(searchTerm) ||
      ticket.numeroTicket.toLowerCase().includes(searchTerm) ||
      ticket.categorie.toLowerCase().includes(searchTerm)
    );
  }

  //delete just fermer ou resolu
  public deleteTicket(ticket :TicketBase):void{}
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
      return this.filteredTickets.filter(item => item.isSelected);
    }
    //-----------Filtrage-----------------
    private compare(a: number | string, b: number | string, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    private compareDates(dateA: string, dateB: string, isAsc: boolean): number {
    const [dayA, monthA, yearA] = dateA.split('/').map(Number);
    const [dayB, monthB, yearB] = dateB.split('/').map(Number);
    
    const dateObjA = new Date(yearA, monthA - 1, dayA);
    const dateObjB = new Date(yearB, monthB - 1, dayB);
    
    return this.compare(dateObjA.getTime(), dateObjB.getTime(), isAsc);
  }
    sortData(sort: Sort): void {
    const data = this.filteredTickets.slice();
    
    if (!sort.active || sort.direction === '') {
      this.filteredTickets = data;
      return;
    }
    this.filteredTickets = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      
      switch (sort.active) {
        case 'id':
          return this.compare(a.id!, b.id!, isAsc);
        case 'titre':
          return this.compare(a.titre!, b.titre!, isAsc);
       /* * case 'auteur':
          return this.compare(a.numeroTicket!, b.numeroTicket!, isAsc);
        case 'departement':
          return this.compare(a.description!, b.description!, isAsc);
        case 'dateCreation':
          return this.compareDates(a.createdAt!, b.createdAt!, isAsc);
        case 'participants':
          return this.compare(a.priorite!, b.priorite!, isAsc);
        case 'statut':
          return this.compare(a.statut!, b.statut!, isAsc);
        case 'expiration':
          return this.compare(a.categorie!, b.categorie!, isAsc);*/
        default:
          return 0;
      }
    });
    }
    ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        this.sortData(this.sort);
      });
    }
  }
}
