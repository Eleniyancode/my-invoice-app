const STORAGE_KEY = "invoices";

/**
 * Get all invoices from localStorage
 */
export const getInvoicesFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save full invoice array to localStorage
 */
export const saveInvoicesToStorage = (invoices) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};
