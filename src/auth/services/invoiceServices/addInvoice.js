import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { generateInvoiceId } from "../../../utils/generateId";

export const addInvoice = async (invoice) => {
  const user = auth.currentUser;
  const docRef = await addDoc(collection(db, "invoices"), invoice);

  if (!user) {
    throw new Error("User not authenticated");
  }

  return await addDoc(collection(db, "invoices"), {
    ...invoice,

    id: docRef.id,
    invoiceId: generateInvoiceId(),
    userId: user.uid,
    createdAt: new Date(),
  });
};
