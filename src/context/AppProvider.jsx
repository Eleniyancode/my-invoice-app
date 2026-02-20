import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        // console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
      })
      .catch((err) => console.error(err));
  }, []);

  const createInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, { ...newInvoice, id: Date.now() }]);
  };

  // ✏️ UPDATE
  const updateInvoice = (id, updatedData) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updatedData } : inv)),
    );
  };

  // 🗑 DELETE
  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        invoices,
        setInvoices,
        createInvoice,
        updateInvoice,
        deleteInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
