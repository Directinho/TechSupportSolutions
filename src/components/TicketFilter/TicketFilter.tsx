import Styles from "./TicketFilter.module.css";
import { STATUSES } from "../../models/Ticket";
import type { Status, StatusFilter } from "../../models/Ticket";

interface TicketFilterProps {
  search: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
}

function TicketFilter({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TicketFilterProps) {
  return (
    <div className={Styles.Principal}>
      <div className={Styles.Filtros}>
        <img
          className={Styles.icaixa}
          src="https://i.imgur.com/YhNdgPN.png"
          alt="Produto"
        />

        <input
          type="text"
          className={Styles.Entrada}
          placeholder="Pesquisar chamado pelo título :)"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <img
          src="https://i.imgur.com/l4PnNl4.png"
          className={Styles.Icone}
          alt="Filtrar"
        />

        <select
          className={Styles.Select}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as Status | "Todos")}
        >
          <option value="Todos">TODOS OS STATUS</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TicketFilter;
