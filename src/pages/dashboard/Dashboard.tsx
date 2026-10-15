import Styles from "./Dashboard.module.css";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketFilter from "../../components/TicketFilter/TicketFilter";
function Dashboard() {
  return (
    <>
      <div className={Styles.fundo}>
        <TicketFilter />
        <TicketCard />
      </div>
    </>
  );
}

export default Dashboard;
