import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
