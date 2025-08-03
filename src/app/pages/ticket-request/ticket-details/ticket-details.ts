import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Ticket } from '../../../models/ticket.model';
import { DateFormatPipeTsPipe } from "../../../pipes/date-format.pipe.ts-pipe";
import { TicketService } from '../../../service/auth/ticket.service';
import { CapitalizePipe } from "../../../pipes/capitalize-pipe";

@Component({
  selector: 'app-ticket-details',
  imports: [DateFormatPipeTsPipe, CapitalizePipe],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css'
})
export class TicketDetails {
  private ticketService = inject(TicketService);

@Input({required: true}) ticket!: Ticket | null;
@Output() deleted = new EventEmitter<string>();


deleteTicket() {
  if (!this.ticket) return;
  if (!confirm('Sei sicuro di voler eliminare questo ticket?')) return;
  this.ticketService.deleteTicket(this.ticket.id).subscribe({
    next: () => this.deleted.emit(this.ticket!.id),
    error: (err) => console.error('Errore durante la cancellazione del ticket:', err)
  })
}

}
