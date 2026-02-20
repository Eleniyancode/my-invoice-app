import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Sidebar from "../components/layout/Sidebar";
import InvoiceList from "../components/ui/InvoiceList";
import { useAppContext } from "../context/useAppContext";
import Main from "../components/layout/Main";
import Modal from "../components/ui/modal";
import CreateInvoiceForm from "../components/ui/CreateInvoiceForm";
import { useState } from "react";

function Dashboard() {
  const { invoices, createInvoice, setInvoices } = useAppContext();
  // const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-light flex">
        <Sidebar />
        <Main>
          <header className="flex p-5 justify-between">
            <div>
              <h1 className="font-sans font-bold text-xl">Invoices</h1>
              <p className="italic">No invoice</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Select
                label=""
                name="status"
                value=""
                options={[
                  { value: "", label: "Filter by status" },
                  { value: "paid", label: "Paid" },
                  { value: "pending", label: "Pending" },
                  { value: "draft", label: "Draft" },
                ]}
              />

              <Button onClick={() => setIsCreateOpen(true)}>
                <div className="flex justify-center items-center gap-2">
                  <p className="p-4 bg-white size-5 rounded-full text-black flex justify-center items-center font-sans font-bold text-2xl">
                    +
                  </p>
                  <p>New invoice</p>
                </div>
              </Button>
            </div>
          </header>

          <InvoiceList invoices={invoices} />
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
