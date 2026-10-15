import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import NewTicket from "../pages/NewTicket/NewTicket";
import TicketDetails from "../pages/TicketDetails/TicketDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/novo" element={<NewTicket />} />
      <Route path="/chamados/:id" element={<TicketDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
