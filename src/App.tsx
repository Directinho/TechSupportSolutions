import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import NewTicket from "./pages/NewTicket/NewTicket";
import TicketDetails from "./pages/TicketDetails/TicketDetails";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/novo" element={<NewTicket />} />
          <Route path="/chamado/:id" element={<TicketDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
