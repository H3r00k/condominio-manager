import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Pipe({
  name: 'orderTicketsDate'
})
export class OrderTicketsDatePipe implements PipeTransform {
  transform(tickets: Ticket[]): Ticket[] {
    return [...tickets].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}