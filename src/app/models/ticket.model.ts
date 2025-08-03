export interface Ticket{
    id: string;
    userId: string;
    object: string;
    nomeUtente: string;
    content: string;
    createdAt: string;
}

export type NewTicket = Omit<Ticket, 'id' | 'createdAt'>;