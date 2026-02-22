import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Sidebar from "../components/layout/Sidebar";
import InvoiceList from "../components/ui/InvoiceList";
import { useAppContext } from "../context/useAppContext";
import Main from "../components/layout/Main";
import Modal from "../components/ui/modal";
import CreateInvoiceForm from "../components/ui/CreateInvoiceForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

function Dashboard() {
  const { invoices, createInvoice, setInvoices } = useAppContext();
  const [filterBy, setFilterBy] = useState("all");
  const navigate = useNavigate();

  const filteredInvoices =
    filterBy === "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status === filterBy);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-light dark:bg-tertiary-light transition duration-300 flex flex-col md:flex-row md:min-h-screen">
        <div className="">
          <Sidebar />
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="flex md:hidden items-center justify-center mt-3 p-2 font-bold gap-2 hover:text-primary-dark transition-all duration-200 cursor-pointer"
          >
            <ChevronLeftIcon className="block size-6 text-primary-dark" />
            <span className="block text-primary-dark">Go Back</span>
          </button>
        </div>
        <Main>
          <header className="flex md:p-5 mb-3 justify-between gap-3">
            <div>
              <h1 className="font-sans font-bold md:text-xl text-lg dark:text-white">
                Invoices
              </h1>
              <div className="italic dark:text-gray-dark">
                {filteredInvoices.length < 1 ? (
                  <span>No invoice</span>
                ) : (
                  <div>
                    <span className="md:hidden">
                      {invoices.length} invoices
                    </span>
                    <span className="hidden md:block">
                      There are {invoices.length} invoices
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="hidden md:block">
                <Select
                  label=""
                  name="status"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  options={[
                    { value: "all", label: "All Invoices" },
                    { value: "paid", label: "Paid Invoice(s)" },
                    { value: "pending", label: "Pending Invoice(s)" },
                    { value: "draft", label: "Draft Invoice(s)" },
                  ]}
                />
              </div>
              <div className="md:hidden">
                <Select
                  label=""
                  name="status"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  options={[
                    { value: "all", label: "Filter" },
                    { value: "paid", label: "Paid" },
                    { value: "pending", label: "Pending" },
                    { value: "draft", label: "Draft" },
                  ]}
                />
              </div>

              <Button onClick={() => setIsCreateOpen(true)}>
                <div className="flex justify-center items-center gap-2">
                  <p className="p-4 bg-white size-5 rounded-full text-black flex justify-center items-center font-sans font-bold text-2xl">
                    +
                  </p>
                  <p className="hidden md:block">New invoice</p>
                  <p className="md:hidden">New</p>
                </div>
              </Button>
            </div>
          </header>

          <InvoiceList invoices={filteredInvoices} />
        </Main>

        {/* EDIT MODAL */}
        {isCreateOpen && (
          <Modal onClose={() => setIsCreateOpen(false)}>
            <CreateInvoiceForm
              invoices={invoices}
              setInvoices={setInvoices}
              setIsCreateOpen={setIsCreateOpen}
              createInvoice={createInvoice}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Dashboard;
