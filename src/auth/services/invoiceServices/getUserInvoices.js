import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export const getUserInvoices = async () => {
  const user = auth.currentUser;

  const q = query(collection(db, "invoices"), where("userId", "==", user.uid));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
