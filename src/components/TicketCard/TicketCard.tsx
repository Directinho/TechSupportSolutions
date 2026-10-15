import Styles from "./TicketCard.module.css";
import type { Priority, Ticket } from "../../models/Ticket";

interface TicketCardProps {
  ticket: Ticket;
}

const priorityColor: Record<Priority, string> = {
  Baixa: "var(--verde-b)",
  Média: "var(--amarelo-b)",
  Alta: "var(--vermelho-b)",
};

function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className={Styles.Principal}>
      <div className={Styles.Container}>
        <h2 className={Styles.Titulo}>{ticket.title}</h2>
        <p className={Styles.Descricao}>{ticket.description}</p>
        <p className={Styles.Categoria}>
          Categoria: <b>{ticket.category}</b>
        </p>
        <p className={Styles.Status}>
          Status:{" "}
          <span className={Styles.Status_Valor}>
            {ticket.status.replace("_", " ")}
          </span>
        </p>
        <div className={Styles.Prioridade}>
          <b>Prioridade: {ticket.priority}</b>
          <div
            className={Styles.Prioridade_Circulo}
            style={{ backgroundColor: priorityColor[ticket.priority] }}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
