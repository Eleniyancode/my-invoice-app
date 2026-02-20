import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Sidebar from "../components/layout/Sidebar";
import InvoiceList from "../components/ui/InvoiceList";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import Main from "../components/layout/Main";

function Dashboard() {
  const { invoices } = useAppContext();
  const navigate = useNavigate();
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

              <Button onClick={() => navigate("/new")}>
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
      </div>
    </>
  );
}

export default Dashboard;
