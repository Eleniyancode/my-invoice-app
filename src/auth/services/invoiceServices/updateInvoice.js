import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateInvoice = async (id, updatedData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const invoiceRef = doc(db, "invoices", id);

  await updateDoc(invoiceRef, updatedData);
};
