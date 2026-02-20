import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import DatePicker from "./DatePicker";
import Input from "./Input";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/16/solid";
import { formatCurrency } from "../../utils/formatCurrency";

function CreateInvoiceForm({ createInvoice, setIsCreateOpen }) {
  const [streetAddress, setStreetAddress] = useState("14 Bodija Avenue");
  const [city, setCity] = useState("Ibadan");
  const [postCode, setPostCode] = useState("NR24 5WQ");
  const [country, setCountry] = useState("Nigeria");
  const [clientName, setClientName] = useState("");
  const [clientStreetAddress, setClientStreetAddress] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [paymentTerm, setPaymentTerm] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [total, setTotal] = useState(0);
  const [saveAsDraft, setSaveAsDraft] = useState(true);

  const handleItemChange = (index, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const updatedItems = items.map((item) => ({
    ...item,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }));

  function handleDeleteItem(e, id) {
    e.preventDefault();
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((inv, i) => i !== id));
  }

  function handleAddNewItem(e) {
    e.preventDefault();

    setItems((prev) => [...prev, { name: "", quantity: 0, price: 0 }]);
  }

  const getItemsTotal = () => {
    const itemsTotal = updatedItems
      .map((item) => item.price * item.quantity)
      .reduce((a, c) => a + c, 0);
    console.log(total);
    setTotal(itemsTotal);

    return itemsTotal;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newInvoice = {
      createdAt: invoiceDate,
      paymentDue: paymentTerm,
      description: productDescription,
      paymentTerms: paymentTerm,
      clientName: clientName,
      clientEmail: clientEmail,
      status: saveAsDraft === "true" ? "pending" : "draft",
      senderAddress: {
        street: streetAddress,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientAddress: {
        street: clientStreetAddress,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: updatedItems,
      total: getItemsTotal(),
    };
    createInvoice(newInvoice);
    setIsCreateOpen(null);
  }

  function handleCancelCreate(e) {
    e.preventDefault();
    setIsCreateOpen(false);
  }

  function handleSaveAsDraft(e) {
    e.preventDefault();
    setSaveAsDraft(false);
    handleSubmit(e);
    setIsCreateOpen(false);
  }
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-10 p-8 h-screen overflow-y-scroll">
        <form>
          <h2>Create New Form</h2>

          <div className="my-5">
            <p>Bill From</p>

            <div className="my-2">
              <Input
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-5">
              <Input
                name="city"
                id="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                name="postCode"
                id="postCode"
                label="Post Code"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
              <Input
                name="country"
                id="country"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div>
            <p className="my-2">Bill To</p>

            <div className=" flex flex-col gap-5">
              <Input
                name="clientName"
                id="clientName"
                label="Client's Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />

              <Input
                name="clientEmail"
                id="clientEmail"
                label="Client's Email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />

              <Input
                name="clientStreetAddress"
                id="clientStreetAddress"
                label="Street Address"
                value={clientStreetAddress}
                onChange={(e) => setClientStreetAddress(e.target.value)}
              />
            </div>

            <div className="flex gap-5 my-5">
              <Input
                name="clientCity"
                id="clientCity"
                label="City"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
              />
              <Input
                name="clientPostCode"
                id="clientPostCode"
                label="Post Code"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
              />
              <Input
                name="clientCountry"
                id="clientCountry"
                label="Country"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
              />
            </div>

            <div className="flex gap-5">
              <DatePicker
                label="Invoice Date"
                id="invoiceDate"
                name="InvoiceDate"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />

              <DatePicker
                label="Payment Terms"
                id="paymentTerms"
                name="paymentTerms"
                value={paymentTerm}
                onChange={(e) => setPaymentTerm(e.target.value)}
              />
            </div>

            <div className="my-4">
              <Input
                name="productDescription"
                id="productDescription"
                label="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>

            <ul className="my-5">
              <h3 className="my-3">Item List</h3>
              <div className="flex">
                <p className="flex-2">Item Name</p>
                <p className="flex-1">Qty.</p>
                <p className="flex-1 flex justify-center">Price</p>
                <p className="flex-1 flex justify-center">Total</p>
              </div>
              {items.map((item, i) => (
                <li key={i} className="flex gap-5 my-3">
                  <div className="flex-2">
                    <Input
                      name="name"
                      id="name"
                      label=""
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(i, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      name="quantity"
                      id="quantity"
                      label=""
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(i, "quantity", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      name="price"
                      id="price"
                      label=""
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(i, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex-1 flex justify-center items-center">
                    <p className="">
                      {formatCurrency(item.quantity * item.price)}
                    </p>
                    <button
                      className="w-4 h-4"
                      onClick={(e) => handleDeleteItem(e, i)}
                    >
                      <TrashIcon className="text-gray-dark transition duration-300 hover:text-red-800 cursor-pointer size-6" />
                    </button>
                  </div>
                </li>
              ))}

              <button
                onClick={(e) => handleAddNewItem(e)}
                className="my-5 text-center bg-blue-50 transition duration-700 cursor-pointer hover:bg-blue-100 w-full p-4 rounded-b-xl"
              >
                + Add New Item
              </button>
            </ul>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div>
              <Button onClick={(e) => handleCancelCreate(e)} variant="gray">
                Discard
              </Button>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={(e) => handleSaveAsDraft(e)}>
                Save as Draft
              </Button>
              <Button onClick={(e) => handleSubmit(e)} variant="primary">
                Save and Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInvoiceForm;
