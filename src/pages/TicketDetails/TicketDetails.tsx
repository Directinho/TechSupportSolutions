import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Styles from "./TicketDetails.module.css";
import {
  deleteTicket,
  getErrorMessage,
  getTicketById,
  updateTicketStatus,
} from "../../services/api";
import { STATUSES } from "../../models/Ticket";
import type { Status, Ticket } from "../../models/Ticket";

function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;

    getTicketById(id)
      .then((res) => active && setTicket(res.data))
      .catch(
        (err) =>
          active &&
          setError(
            getErrorMessage(err, "Não foi possível carregar o chamado."),
          ),
      )
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    if (!ticket) return;
    const newStatus = e.target.value as Status;

    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await updateTicketStatus(ticket, newStatus);
      setTicket({ ...ticket, status: newStatus });
      setSuccess("Status atualizado com sucesso!");
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível atualizar o status."));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!ticket || !window.confirm("Deseja realmente excluir este chamado?"))
      return;

    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await deleteTicket(ticket.id);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível excluir o chamado."));
      setBusy(false);
    }
  };

  return (
    <div className={Styles.fundo}>
      <div className={Styles.container}>
        <h1 className={Styles.titulo}>Detalhes do Chamado</h1>

        {loading && <div className={Styles.info}>Carregando chamado...</div>}
        {success && <div className={Styles.sucesso}>{success}</div>}
        {error && <div className={Styles.erro}>{error}</div>}

        {ticket && (
          <div className={Styles.detalhes}>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>
              Categoria: <b>{ticket.category}</b>
            </p>
            <p>
              Prioridade: <b>{ticket.priority}</b>
            </p>

            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={ticket.status}
              onChange={handleStatusChange}
              disabled={busy}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>

            <button
              type="button"
              className={Styles.excluir}
              onClick={handleDelete}
              disabled={busy}
            >
              Excluir chamado
            </button>
          </div>
        )}

        <Link to="/" className={Styles.voltar}>
          ← Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TicketDetails;
