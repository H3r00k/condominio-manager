import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTicket, Ticket } from '../../../models/ticket.model';
import { AuthService } from '../../../service/auth/auth.service';
import { TicketService } from '../../../service/auth/ticket.service';

@Component({
  selector: 'app-user-ticket-form',
  imports: [FormsModule],
  templateUrl: './user-ticket-form.html',
  styleUrl: './user-ticket-form.css',
})
export class UserTicketForm {
  private authService = inject(AuthService);
  private ticketService = inject(TicketService);

  formData = {
    object: '',
    content: '',
  };
  success = false;
  error = '';

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const user = this.authService.user();

    const newTicket: NewTicket = {
      userId: user!.id,
      nomeUtente: `${user!.name} ${user!.subname}`,
      object: this.formData.object,
      content: this.formData.content,
    };

    this.ticketService.createTicket(newTicket).subscribe({
      next: () => {
        this.success = true;
        this.error = '';
        form.reset();
      },
      error: () => {
        this.success = false;
        this.error =
          'Errore durante la creazione del ticket. Riprova più tardi.';
      },
    });
  }
}
