import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { generateInvoiceId } from "../../../utils/generateId";
import { formatDate } from "../../../utils/formatDate";

export const addInvoice = async (invoice) => {
  const user = auth.currentUser;
  const today = new Date();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const docRef = await addDoc(collection(db, "invoices"), {
    ...invoice,

    invoiceId: generateInvoiceId(),
    userId: user.uid,
    createdAt: formatDate(today),
  });

  return {
    id: docRef.id, // Firestore ID
    ...invoice,
    userId: user.uid,
  };
};
