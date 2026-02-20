import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

formatCurrency;
function InvoiceList({ invoices }) {
  return (
    <>
      {invoices.length === 0 ? (
        <div className="flex justify-center items-center gap-5 flex-col mt-10">
          <img src="../illustration-empty.svg" alt="empty-illustration-image" />

          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="font-bold font-sans text-lg">
              There is nothing here
            </h1>
            <p className="text-gray-dark text-center">
              Create an invoice by clicking the <br /> New Invoice button and
              get started
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {invoices.map((inv) => (
            <li
              key={inv.id}
              className="flex gap-5 p-5 bg-white justify-center items-center"
            >
              <div className="flex text-gray-dark font-sans flex-2 p-5 gap-20 justify-around">
                <p className="font-bold text-gray-dark">
                  #<span className="text-tertiary-dark">{inv.id}</span>
                </p>
                <p>{formatDate(inv.createdAt)}</p>
                <p>{inv.clientName}</p>
              </div>
              <div className="flex flex-1 gap-10 p-5 justify-around">
                <p className="font-bold text-tertiary-dark">
                  {formatCurrency(inv.total)}
                </p>
                <div
                  className={`py-2 px-3 rounded-md flex justify-center items-center gap-1 font-bold ${inv.status === "pending" ? "text-orange-600 bg-orange-100" : inv.status === "paid" ? "text-green-400 bg-green-50" : "text-black bg-blue-50"}`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${inv.status === "pending" ? "bg-orange-600" : inv.status === "paid" ? "bg-green-400" : "bg-black"}`}
                  ></p>
                  <p>{capitalizeFirstLetter(inv.status)}</p>
                </div>
                <Link
                  to={`/invoice/${inv.id}`}
                  className="text-lg font-bold font-sans text-primary-dark cursor-pointer hover:text-primary-dark "
                >
                  <ChevronRightIcon className="text-primary-dark hover:text-secondary-light transition-all duration-300 size-6" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default InvoiceList;
