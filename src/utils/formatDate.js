// utils/formatDate.js
export function formatDate(dateInput) {
  const date = new Date(dateInput);

  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}
