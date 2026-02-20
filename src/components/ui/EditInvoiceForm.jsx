import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import DatePicker from "./DatePicker";
import Input from "./Input";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/16/solid";
import { formatCurrency } from "../../utils/formatCurrency";

function EditInvoiceForm({ invoice, updateInvoice, onClose }) {
  const [streetAddress, setStreetAddress] = useState(
    invoice.senderAddress.street,
  );
  const [city, setCity] = useState(invoice.senderAddress.city);
  const [postCode, setPostCode] = useState(invoice.senderAddress.postCode);
  const [country, setCountry] = useState(invoice.senderAddress.country);
  const [clientName, setClientName] = useState(invoice.clientName);
  const [clientStreetAddress, setClientStreetAddress] = useState(
    invoice.clientAddress.street,
  );
  const [clientCity, setClientCity] = useState(invoice.clientAddress.city);
  const [clientEmail, setClientEmail] = useState(invoice.clientEmail);
  const [clientPostCode, setClientPostCode] = useState(
    invoice.clientAddress.postCode,
  );
  const [clientCountry, setClientCountry] = useState(
    invoice.clientAddress.country,
  );
  const [invoiceDate, setInvoiceDate] = useState(invoice.createdAt);
  const [paymentTerm, setPaymentTerm] = useState(invoice.paymentDue);
  const [productDescription, setProductDescription] = useState(
    invoice.description,
  );
  const [items, setItems] = useState(invoice.items);
  const [total, setTotal] = useState(invoice.total);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  // const [itemTotal, setItemTotal] = useState("");

  const updatedItems = items.map((item) => ({
    ...item,
    name: itemName,
    quantity: itemQuantity,
    price: itemPrice,
    total: itemQuantity * itemPrice,
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

  function handleSubmit(e) {
    e.preventDefault();
    const updatedData = {
      id: invoice.id,
      createdAt: invoiceDate,
      paymentDue: paymentTerm,
      description: productDescription,
      paymentTerms: paymentTerm,
      clientName: clientName,
      clientEmail: clientEmail,
      status: invoice.status,
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
      total: total,
    };

    updateInvoice(invoice.id, updatedData);
    onClose();
  }
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-10 p-8 h-screen overflow-y-scroll">
        <form>
          <h2>Edit #{invoice.id}</h2>

          <div className="my-5">
            <p>Bill Form</p>

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

            <div>
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
                      placeholder={item.name}
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      name="quantity"
                      id="quantity"
                      label=""
                      placeholder={item.quantity}
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      name="price"
                      id="price"
                      label=""
                      placeholder={formatCurrency(item.price)}
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
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

          <div className="flex justify-end gap-4">
            <Button variant="gray">Cancel</Button>
            <Button onClick={(e) => handleSubmit(e)} variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInvoiceForm;
