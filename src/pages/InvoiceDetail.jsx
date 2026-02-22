import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";
import {
  ChevronLeftIcon,
  NoSymbolIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Button from "../components/ui/Button";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";
import EditInvoiceForm from "../components/ui/EditInvoiceForm";
import Modal from "../components/ui/modal";
import DeleteInvoiceForm from "../components/ui/DeleteInvoiceForm";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices, setInvoices, deleteInvoice, updateInvoice } =
    useAppContext();

  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deletingInvoice, setDeletingInvoice] = useState(null);

  // Convert id to number if your ids are numbers
  const invoice = invoices.find((inv) => inv.id === id);

  const handleMarkAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  if (!invoices.length)
    return (
      <p className="w-full h-screen flex justify-center items-center">
        Loading
      </p>
    );
  if (!invoice) {
    return (
      <div className="p-4 w-full h-screen flex items-center gap-1 justify-center text-lg bg-gray-light dark:bg-tertiary-light dark:text-white ">
        <XMarkIcon className="text-red-500 size-10" />
        <p>Invoice not found.</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="hidden items-center justify-center mt-3 p-2 font-bold gap-2 hover:text-primary-dark transition-all duration-200 cursor-pointer"
        >
          <ChevronLeftIcon className="block size-6 text-primary-dark" />
          <span className="block text-primary-dark">Go Back</span>
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-light dark:bg-tertiary-light transition duration-300 flex flex-col md:flex-row min-w-screen md:max-h-screen">
        <div className="">
          <Sidebar />
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="hidden items-center justify-center mt-3 p-2 font-bold gap-2 hover:text-primary-dark transition-all duration-200 cursor-pointer"
          >
            <ChevronLeftIcon className="block size-6 text-primary-dark" />
            <span className="block text-primary-dark">Go Back</span>
          </button>
        </div>
        <Main>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center justify-center p-2 font-bold gap-2 hover:text-primary-dark transition-all duration-200 cursor-pointer"
          >
            <ChevronLeftIcon className="block size-6 text-primary-dark" />
            <span className="block dark:text-white hover:dark:text-primary-dark">
              Go Back
            </span>
          </button>

          <section className="md:flex justify-between items-center p-5 bg-white transition duration-300 dark:bg-tertiary-dark my-5 rounded-lg">
            <div className="flex justify-between gap-4 items-center">
              <p className="text-gray-dark dark:text-white">Status</p>
              <div
                className={`py-2 px-5 rounded-md flex justify-center items-center gap-1 font-bold ${invoice.status === "pending" ? "text-orange-600 bg-orange-100" : invoice.status === "paid" ? "text-green-400 bg-green-50" : "text-black bg-blue-50"}`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${invoice.status === "pending" ? "bg-orange-600" : invoice.status === "paid" ? "bg-green-400" : "bg-black"}`}
                ></p>
                <p>{capitalizeFirstLetter(invoice.status)}</p>
              </div>
            </div>

            <div className="hidden md:flex gap-2">
              <Button onClick={() => setEditingInvoice(invoice)} variant="gray">
                <p>Edit</p>
              </Button>
              <Button
                onClick={() => setDeletingInvoice(invoice)}
                variant="secondary"
              >
                <p>Delete</p>
              </Button>
              <Button onClick={() => handleMarkAsPaid(id)} variant="primary">
                <p>Mark as Paid</p>
              </Button>
            </div>
          </section>

          <section className="bg-white dark:bg-tertiary-light transition duration-300 rounded-lg px-6 py-6 md:py-8 md:px-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div className="flex flex-col md:gap-2">
                <p className="font-bold text-gray-dark">
                  #
                  <span className="text-tertiary-dark dark:text-white">
                    {invoice.id}
                  </span>
                </p>
                <p className="text-gray-dark ">{invoice.description}</p>
              </div>
              <div>
                <ul className="text-gray-dark dark:text-white md:text-right flex flex-col mb-3">
                  <li>{invoice.senderAddress.street}</li>
                  <li>{invoice.senderAddress.city}</li>
                  <li>{invoice.senderAddress.postCode}</li>
                  <li>{invoice.senderAddress.country}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-10 ">
              <div className="flex md:flex-1 md:gap-10">
                <div className="flex flex-col gap-5 flex-1">
                  <div>
                    <p className="text-gray-dark">Invoice Date</p>
                    <p className="text-tertiary-dark font-bold font-sans dark:text-white">
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-dark">Payment Date</p>
                    <p className="text-tertiary-dark font-bold font-sans dark:text-white">
                      {formatDate(invoice.paymentDue)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-gray-dark">Bill To</p>
                  <p className="text-tertiary-dark font-bold font-sans dark:text-white">
                    {invoice.clientName}
                  </p>
                  <ul className="text-gray-dark flex flex-col dark:text-white">
                    <li>{invoice.clientAddress.street}</li>
                    <li>{invoice.clientAddress.city}</li>
                    <li>{invoice.clientAddress.postCode}</li>
                    <li>{invoice.clientAddress.country}</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-5 flex-1">
                <div>
                  <p className="text-gray-dark">Sent to</p>
                  <p className="text-tertiary-dark dark:text-white font-bold font-sans">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 my-4 md:my-8 md:p-10 bg-blue-50 dark:bg-tertiary-dark">
              <ul className="flex gap-5 flex-col">
                <header className="hidden md:flex gap-20 text-gray-dark justify-between">
                  <p className="flex-1">Item Name</p>
                  <p className="flex-1">QTY.</p>
                  <p className="flex-1">Price</p>
                  <p className="flex-1">Total</p>
                </header>
                {invoice.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex md:gap-20 text-tertiary-dark dark:text-white font-bold justify-between items-center md:items-start"
                  >
                    <div className="hidden md:flex md:flex-10">
                      <p className="md:flex-1">{item.name}</p>
                      <p className="text-primary-dark md:flex-1">
                        {item.quantity}
                      </p>
                      <p className="text-primary-dark dark:text-white md:flex-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="md:hidden">
                      <p className="md:flex-1">{item.name}</p>
                      <div className="flex gap-3">
                        <p className="text-primary-dark dark:text-white md:flex-1">
                          {item.quantity}
                        </p>
                        <span className="text-primary-dark dark:text-white">
                          X
                        </span>
                        <p className="text-primary-dark md:flex-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <p className="md:flex-3">
                      {formatCurrency(+item.price * +item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center bg-tertiary-dark dark:bg-black dark:text-white md:p-10 p-5 md:pr-20 rounded-lg font-sans text-white justify-between">
                <p>Amount Due</p>
                <p className="text-lg font-bold ">
                  {formatCurrency(invoice.total)}
                </p>
              </div>
            </div>
          </section>
        </Main>
      </div>
      <section className="flex md:hidden justify-center items-center md:p-5 bg-white my-5 rounded-lg">
        <div className="flex gap-5 items-center justify-center  md:hidden">
          <Button onClick={() => setEditingInvoice(invoice)} variant="gray">
            <p>Edit</p>
          </Button>
          <Button
            onClick={() => setDeletingInvoice(invoice)}
            variant="secondary"
          >
            <p>Delete</p>
          </Button>
          <Button onClick={() => handleMarkAsPaid(id)} variant="primary">
            <p>Mark as Paid</p>
          </Button>
        </div>
      </section>

      {/* EDIT MODAL */}
      {editingInvoice && (
        <Modal onClose={() => setEditingInvoice(null)}>
          <EditInvoiceForm
            invoice={editingInvoice}
            setEditingInvoice={setEditingInvoice}
            updateInvoice={updateInvoice}
          />
        </Modal>
      )}

      {/* DELETE MODAL */}
      {deletingInvoice && (
        <DeleteInvoiceForm
          deleteInvoice={deleteInvoice}
          deletingInvoice={deletingInvoice}
          setDeletingInvoice={setDeletingInvoice}
        />
      )}
    </>
  );
}

export default InvoiceDetail;
