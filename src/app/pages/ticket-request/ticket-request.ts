import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Header } from '../shared/header/header';
import { UserTicketForm } from './user-ticket-form/user-ticket-form';
import { AuthService } from '../../service/auth/auth.service';
import { TicketService } from '../../service/auth/ticket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdminTicketList } from "./admin-ticket-list/admin-ticket-list";
import { Ticket } from '../../models/ticket.model';
import { TicketDetails } from "./ticket-details/ticket-details";

@Component({
  selector: 'app-ticket-request',
  imports: [Header, UserTicketForm, AdminTicketList, TicketDetails],
  templateUrl: './ticket-request.html',
  styleUrl: './ticket-request.css',
})
export class TicketRequest implements OnInit {
  protected auth = inject(AuthService);
  private ticketService = inject(TicketService);
  tickets = this.ticketService.getTicketSignal(); 
  
  selectedTicket = signal<Ticket | null>(null);
  ticketCount = computed(() => this.tickets().length);

  showAdminPanel = signal(false);
  showButtonTickets = signal(true);


  ngOnInit(): void {
    this.ticketService.fetchTickets();
  }

  showTickets() {
    this.showButtonTickets.set(false);
    this.showAdminPanel.set(true);
  }

  apriDettaglio(ticket: Ticket){
    this.selectedTicket.set(ticket);
  }

  rimuoviTicket(ticketId: string){
    this.selectedTicket.set(null);
    this.ticketService.fetchTickets();
  }
}
