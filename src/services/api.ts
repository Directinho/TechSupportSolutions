import axios from "axios";
import type { Ticket, TicketFormData } from "../models/Ticket";

const api = axios.create({
    baseURL: "https://techsupportsolutions.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getTickets = () => api.get<Ticket[]>("/tickets");
export const getTicketById = (id: number) => api.get<Ticket>(`/tickets/${id}`);
export const newTicket = (data: TicketFormData) => api.post<Ticket>("/tickets", {
    ...data,
    status: data.status ?? "Aberto",
});
export const updateTicket = (id: number, data: Partial<Ticket>) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id: number) => api.delete(`/tickets/${id}`);