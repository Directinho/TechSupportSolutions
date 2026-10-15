export const CATEGORIES = ["Hardware", "Software", "Rede"] as const;
export const PRIORIDADES = ["Baixa", "Média", "Alta"] as const;
export const STATUSES = ["Aberto", "Em_andamento", "Resolvido"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORIDADES)[number];
export type Status = (typeof STATUSES)[number];
export type StatusFilter = Status | "Todos";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    category: Category;
    priority: Priority;
    status: Status;
}

export interface TicketFormData {
    title: string;
    description: string;
    category: Category;
    priority: Priority;
    status?: Status;
}