import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { TicketService } from '../../../service/auth/ticket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Ticket } from '../../../models/ticket.model';
import { DateFormatPipeTsPipe } from "../../../pipes/date-format.pipe.ts-pipe";
import { OrderTicketsDatePipe } from "../../../pipes/order-tickets-date-pipe";


@Component({
  selector: 'app-admin-ticket-list',
  imports: [DateFormatPipeTsPipe, OrderTicketsDatePipe],
  templateUrl: './admin-ticket-list.html',
  styleUrl: './admin-ticket-list.css'
})
export class AdminTicketList {
private ticketService = inject(TicketService);

tickets = this.ticketService.getTicketSignal(); 

selectedTicket = signal<Ticket | null>(null);

@Output() visualizza = new EventEmitter<Ticket>()

selectTicket(ticket: Ticket){
  this.selectedTicket.set(ticket);
  this.visualizza.emit(ticket);
}

}
