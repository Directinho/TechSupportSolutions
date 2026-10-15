import axios from "axios";
import type { Ticket, TicketFormData, Status } from "../models/Ticket";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const getTickets = () => api.get<Ticket[]>("/tickets");

export const getTicketById = (id: number | string) =>
  api.get<Ticket>(`/tickets/${id}`);

export const newTicket = (data: TicketFormData) =>
  api.post<Ticket>("/tickets", {
    ...data,
    status: data.status ?? "Aberto",
  });

export const updateTicket = (id: number | string, data: Partial<Ticket>) =>
  api.put<Ticket>(`/tickets/${id}`, data);

export const updateTicketStatus = (ticket: Ticket, status: Status) =>
  api.put<Ticket>(`/tickets/${ticket.id}`, { ...ticket, status });

export const deleteTicket = (id: number | string) =>
  api.delete(`/tickets/${id}`);

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "A API demorou demais para responder. Tente novamente.";
    }
    if (!error.response) {
      return "Não foi possível conectar à API. Verifique sua conexão.";
    }
    const apiMessage = (error.response.data as { message?: string } | undefined)
      ?.message;
    return apiMessage ?? `${fallback} (erro ${error.response.status})`;
  }
  return fallback;
}
