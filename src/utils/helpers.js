const isSameMonth = (date1, date2) =>
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const getNextDueDate = (lastPaidDate) => {
  const date = new Date(lastPaidDate);
  date.setMonth(date.getMonth() + 1);
  return date;
};

export const categorizeBills = (recurringBills) => {
  const today = new Date();

  const paidThisMonth = [];
  const dueSoon = [];
  const upcoming = [];

  recurringBills.forEach((bill) => {
    const lastPaid = new Date(bill.date);
    const nextDue = getNextDueDate(lastPaid);

    const diffInDays = (nextDue - today) / (1000 * 60 * 60 * 24);

    // ✅ Paid This Month
    if (isSameMonth(lastPaid, today)) {
      paidThisMonth.push(bill);
    }

    // ⏳ Due Soon (within 5 days)
    else if (diffInDays <= 7 && diffInDays >= 0) {
      dueSoon.push({ ...bill, nextDue });
    }

    // 📅 Upcoming
    else if (diffInDays > 5) {
      upcoming.push({ ...bill, nextDue });
    }
  });

  return { paidThisMonth, dueSoon, upcoming };
};
