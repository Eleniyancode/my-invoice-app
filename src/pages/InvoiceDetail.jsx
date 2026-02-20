import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
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
  console.log(typeof id);

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

  if (!invoice) {
    return <p className="p-4">Invoice not found.</p>;
  }
  return (
    <div className="bg-gray-light flex min-w-screen min-h-screen">
      <Sidebar />
      <Main>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 font-bold gap-2 hover:text-primary-dark transition-all duration-200 cursor-pointer"
        >
          <ChevronLeftIcon className="block size-6 text-primary-dark" />
          <span className="block">Go Back</span>
        </button>

        <section className="flex justify-between items-center p-5 bg-white my-5 rounded-lg">
          <div className="flex gap-4 items-center">
            <p>Status</p>
            <div
              className={`py-2 px-5 rounded-md flex justify-center items-center gap-1 font-bold ${invoice.status === "pending" ? "text-orange-600 bg-orange-100" : invoice.status === "paid" ? "text-green-400 bg-green-50" : "text-black bg-blue-50"}`}
            >
              <p
                className={`w-2 h-2 rounded-full ${invoice.status === "pending" ? "bg-orange-600" : invoice.status === "paid" ? "bg-green-400" : "bg-black"}`}
              ></p>
              <p>{capitalizeFirstLetter(invoice.status)}</p>
            </div>
          </div>

          <div className="flex gap-2">
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

        <section className="bg-white rounded-lg py-8 px-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-dark">
                #<span className="text-tertiary-dark">{invoice.id}</span>
              </p>

              <p className="text-gray-dark ">{invoice.description}</p>
            </div>
            <div>
              <ul className="text-gray-dark text-right flex flex-col">
                <li>{invoice.senderAddress.street}</li>
                <li>{invoice.senderAddress.city}</li>
                <li>{invoice.senderAddress.postCode}</li>
                <li>{invoice.senderAddress.country}</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-5 flex-1">
              <div>
                <p className="text-gray-dark">Invoice Date</p>
                <p className="text-tertiary-dark font-bold font-sans">
                  {formatDate(invoice.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-gray-dark">Invoice Date</p>
                <p className="text-tertiary-dark font-bold font-sans">
                  {formatDate(invoice.paymentDue)}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-gray-dark">Bill To</p>
              <p className="text-tertiary-dark font-bold font-sans">
                {invoice.clientName}
              </p>
              <ul className="text-gray-dark flex flex-col">
                <li>{invoice.clientAddress.street}</li>
                <li>{invoice.clientAddress.city}</li>
                <li>{invoice.clientAddress.postCode}</li>
                <li>{invoice.clientAddress.country}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-5 flex-1">
              <div>
                <p className="text-gray-dark">Sent to</p>
                <p className="text-tertiary-dark font-bold font-sans">
                  {invoice.clientEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="my-8 p-10 bg-blue-50">
            <ul className="flex gap-5 flex-col">
              <header className="flex gap-20 text-gray-dark justify-between">
                <p className="flex-1">Item Name</p>
                <p className="flex-1">QTY.</p>
                <p className="flex-1">Price</p>
                <p className="flex-1">Total</p>
              </header>
              {invoice.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-20 text-tertiary-dark font-bold justify-between"
                >
                  <p className="flex-1">{item.name}</p>
                  <p className="text-primary-dark flex-1">{item.quantity}</p>
                  <p className="text-primary-dark flex-1">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="flex-1">{formatCurrency(item.total)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center bg-tertiary-dark p-10 pr-20 rounded-lg font-sans text-white justify-between">
              <p>Amount Due</p>
              <p className="text-lg font-bold ">
                {formatCurrency(invoice.total)}
              </p>
            </div>
          </div>
        </section>
      </Main>

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
    </div>
  );
}

export default InvoiceDetail;
