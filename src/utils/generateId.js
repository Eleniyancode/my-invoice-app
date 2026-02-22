export function generateInvoiceId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  return randomLetters + randomNumbers;
}
