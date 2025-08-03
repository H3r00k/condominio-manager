import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { NewTicket, Ticket } from '../../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API_URL = 'http://localhost:3000/requests';
  private readonly API_KEY =
    '$2a$12$1.A9iORrDntT8lu.JHGPT.2/pByjWQAA7KACETTUZs/3t1NgtKzMi';
    private tickets = signal<Ticket[]>([]);

  constructor(private http: HttpClient) {}

  getTicketSignal() {
    return this.tickets.asReadonly();
  }
  getAllTickets() {
    return this.http.get<Ticket[]>(this.API_URL);
  }
  fetchTickets() {
    this.http.get<Ticket[]>('http://localhost:3000/requests').subscribe({
      next: (data) => this.tickets.set(data),
      error: (err) => console.error('Errore nel fetch:', err)
    });
  }
  createTicket(ticket: NewTicket) {
    return this.http.post<Ticket>(this.API_URL, ticket)
  }
  deleteTicket(id: string){
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY,
    })

    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }
}
