import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteInvoice = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const invoiceRef = doc(db, "invoices", id);

  await deleteDoc(invoiceRef);
};
