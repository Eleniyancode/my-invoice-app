import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { getUserInvoices } from "../auth/services/invoiceServices/getUserInvoices";
import { addInvoice } from "../auth/services/invoiceServices/addInvoice";
import { deleteInvoice } from "../auth/services/invoiceServices/deleteInvoice";
import { updateInvoice } from "../auth/services/invoiceServices/updateInvoice";

import { useAuth } from "./useAuthContext";

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("../data.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setInvoices(data);
  //       // console.log(data);
  //       localStorage.setItem("data", JSON.stringify(data));
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const loadInvoices = async () => {
    if (!user) return;

    setLoading(true);
    const data = await getUserInvoices();
    setInvoices(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadInvoices();
    }
  }, [user]);

  const createInvoice = async (newInvoice) => {
    await addInvoice(newInvoice);
    await loadInvoices();
  };

  // ✏️ UPDATE
  const handleUpdateInvoice = async (id, updatedData) => {
    await updateInvoice(id, updatedData);
    await loadInvoices();
  };

  // 🗑 DELETE
  const handleDeleteInvoice = async (id) => {
    await deleteInvoice(id);
    await loadInvoices();
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        invoices,
        setInvoices,
        createInvoice,
        updateInvoice: handleUpdateInvoice,
        deleteInvoice: handleDeleteInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
