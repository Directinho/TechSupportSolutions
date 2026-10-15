export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
}

export interface TicketFormData {
    title: string;
    description: string;
    category: string;
    priority: string;
    status?: string;
}