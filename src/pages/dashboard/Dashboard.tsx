import { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketFilter from "../../components/TicketFilter/TicketFilter";
import { getErrorMessage, getTickets } from "../../services/api";
import type { StatusFilter, Ticket } from "../../models/Ticket";

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("Todos");

  useEffect(() => {
    let active = true;

    getTickets() // GET /tickets
      .then((res) => active && setTickets(res.data))
      .catch(
        (err) =>
          active &&
          setError(
            getErrorMessage(err, "Não foi possível carregar os chamados."),
          ),
      )
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const filtered = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (status === "Todos" || t.status === status),
  );

  return (
    <div className={Styles.fundo}>
      <TicketFilter
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {loading && (
        <p className={Styles.info}>
          Carregando chamados... a primeira requisição pode demorar alguns
          segundos.
        </p>
      )}
      {error && <p className={Styles.erro}>{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className={Styles.info}>Nenhum chamado encontrado.</p>
      )}

      <div className={Styles.lista}>
        {filtered.map((t) => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
