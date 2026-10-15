import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import NewTicket from "../pages/NewTicket/NewTicket";
import TicketDetails from "../pages/TicketDetails/TicketDetails";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/novo" element={<NewTicket />} />
                <Route path="/chamado/:id" element={<TicketDetails />} />
            </Routes>
        </BrowserRouter>
    );
}