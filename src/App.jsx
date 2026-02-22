import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./auth/SignUp";
import Dashboard from "./pages/Dashboard";
import InvoiceDetail from "./pages/InvoiceDetail";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
