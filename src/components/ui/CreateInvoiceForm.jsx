import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import DatePicker from "./DatePicker";
import Input from "./Input";
import Button from "./Button";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/16/solid";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

function CreateInvoiceForm({ createInvoice, setIsCreateOpen }) {
  const [formData, setFormData] = useState({
    senderAddress: {
      street: "14 Bodija Avenue",
      city: "Ibadan",
      postCode: "NR24 5WQ",
      country: "Nigeria",
    },
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: formatDate(new Date()),
    paymentTerms: "",
    productDescription: "",
    items: [{ id: crypto.randomUUID(), name: "", quantity: 0, price: 0 }],
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleItemChange = (itemId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [field]: value,
              // field === "quantity" || field === "price"
              //   ? Number(value)
              //   : value,
            }
          : item,
      ),
    }));
  };

  const handleDeleteItem = (e, index) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: crypto.randomUUID(), name: "", quantity: 0, price: 0 },
      ],
    }));
  };

  const grandTotal = formData.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  const validateForm = () => {
    const newErrors = {};

    // -------- Bill From --------
    if (!formData.senderAddress.street.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.senderAddress.city.trim())
      newErrors.city = "City is required";
    if (!formData.senderAddress.postCode.trim())
      newErrors.postCode = "Post code is required";
    if (!formData.senderAddress.country.trim())
      newErrors.country = "Country is required";

    // -------- Bill To --------
    if (!formData.clientName.trim())
      newErrors.clientName = "Client name is required";

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Client email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Invalid email address";
    }

    if (!formData.clientAddress.street.trim())
      newErrors.clientStreetAddress = "Client street address is required";

    if (!formData.clientAddress.city.trim())
      newErrors.clientCity = "Client city is required";
    if (!formData.clientAddress.postCode.trim())
      newErrors.clientPostCode = "Client post code is required";
    if (!formData.clientAddress.country.trim())
      newErrors.clientCountry = "Client country is required";

    // -------- Dates --------
    if (!formData.invoiceDate)
      newErrors.invoiceDate = "Invoice date is required";
    if (!formData.paymentTerms)
      newErrors.paymentTerms = "Payment term is required";

    // -------- Items --------
    if (formData.items.length === 0) {
      newErrors.items = "At least one item is required";
    } else {
      formData.items.forEach((item, index) => {
        if (!item.name.trim()) {
          newErrors[`itemName-${index}`] = "Item name required";
        }
        if (!item.quantity || item.quantity <= 0) {
          newErrors[`itemQuantity-${index}`] = "Qty must be greater than 0";
        }
        if (!item.price || item.price <= 0) {
          newErrors[`itemPrice-${index}`] = "Price must be greater than 0";
        }
      });
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newInvoice = {
      status: "pending",
      ...formData,
      total: grandTotal,
    };

    try {
      await createInvoice(newInvoice);
      navigate("/dashboard"); // go back after saving
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
    setIsCreateOpen(false);
  };

  function handleCancelCreate(e) {
    e.preventDefault();
    setIsCreateOpen(false);
  }

  function handleSaveAsDraft(e) {
    e.preventDefault();

    if (!validateForm()) return;
    const newInvoice = {
      status: "draft",
      ...formData,
      total: grandTotal,
    };

    createInvoice(newInvoice);
    setIsCreateOpen(false);
  }
  return (
    <div className="flex flex-col md:flex-row h-screen  ">
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
      <div className="flex-10 p-8 h-screen overflow-y-scroll dark:bg-tertiary-light transition duration-300">
        <form>
          <h2 className="dark:text-white">Invoice Form</h2>

          <div className="my-5 dark:text-white">
            <p>Bill From</p>

            <div className="my-2">
              <Input
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                value={formData.senderAddress.street}
                onChange={(e) =>
                  handleAddressChange("senderAddress", "street", e.target.value)
                }
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.streetAddress}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <Input
                  name="city"
                  id="city"
                  label="City"
                  value={formData.senderAddress.city}
                  onChange={(e) =>
                    handleAddressChange("senderAddress", "city", e.target.value)
                  }
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <Input
                  name="postCode"
                  id="postCode"
                  label="Post Code"
                  value={formData.senderAddress.postCode}
                  onChange={(e) =>
                    handleAddressChange(
                      "senderAddress",
                      "postCode",
                      e.target.value,
                    )
                  }
                />
                {errors.postCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postCode}</p>
                )}
              </div>

              <div>
                <Input
                  name="country"
                  id="country"
                  label="Country"
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    handleAddressChange(
                      "senderAddress",
                      "country",
                      e.target.value,
                    )
                  }
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="my-2 dark:text-white">Bill To</p>

            <div className=" flex flex-col gap-5 dark:text-gray-dark">
              <div>
                <Input
                  name="clientName"
                  id="clientName"
                  label="Client's Name"
                  value={formData.clientName}
                  onChange={(e) => handleChange(e)}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientName}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="clientEmail"
                  id="clientEmail"
                  label="Client's Email"
                  value={formData.clientEmail}
                  onChange={(e) => handleChange(e)}
                />
                {errors.clientEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientEmail}
                  </p>
                )}
              </div>

              <div>
                <Input
                  name="clientStreetAddress"
                  id="clientStreetAddress"
                  label="Street Address"
                  value={formData.clientAddress.street}
                  onChange={(e) =>
                    handleAddressChange(
                      "clientAddress",
                      "street",
                      e.target.value,
                    )
                  }
                />
                {errors.clientStreetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientStreetAddress}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-5 my-5">
              <div>
                <Input
                  name="clientCity"
                  id="clientCity"
                  label="City"
                  value={formData.clientAddress.city}
                  onChange={(e) =>
                    handleAddressChange("clientAddress", "city", e.target.value)
                  }
                />
                {errors.clientCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientCity}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="clientPostCode"
                  id="clientPostCode"
                  label="Post Code"
                  value={formData.clientAddress.postCode}
                  onChange={(e) =>
                    handleAddressChange(
                      "clientAddress",
                      "postCode",
                      e.target.value,
                    )
                  }
                />
                {errors.clientPostCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientPostCode}
                  </p>
                )}
              </div>
              <div>
                <Input
                  name="clientCountry"
                  id="clientCountry"
                  label="Country"
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    handleAddressChange(
                      "clientAddress",
                      "country",
                      e.target.value,
                    )
                  }
                />
                {errors.clientCountry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientCountry}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-5">
              <div>
                <DatePicker
                  label="Invoice Date"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={(e) => handleChange(e)}
                  disabled={true}
                />
                {errors.invoiceDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.invoiceDate}
                  </p>
                )}
              </div>
              <div>
                <DatePicker
                  label="Payment Terms"
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => handleChange(e)}
                />
                {errors.paymentTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentTerms}
                  </p>
                )}
              </div>
            </div>

            <div className="my-4">
              <div>
                <Input
                  name="productDescription"
                  id="productDescription"
                  label="Product Description"
                  value={formData.productDescription}
                  onChange={(e) => handleChange(e)}
                />
                {errors.productDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productDescription}
                  </p>
                )}
              </div>
            </div>

            <ul className="my-5 dark:text-white">
              <h3 className="my-3">Item List</h3>
              <div className="flex">
                <p className="flex-2">Item Name</p>
                <p className="flex-1">Qty.</p>
                <p className="flex-1 flex justify-center">Price</p>
                <p className="flex-1 flex justify-center">Total</p>
              </div>
              {formData.items.map((item, i) => (
                <li key={item.id} className="flex gap-5 my-3">
                  <div className="flex-2">
                    <Input
                      name="name"
                      id="name"
                      label=""
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(item.id, "name", e.target.value)
                      }
                    />
                    {errors[`itemName-${i}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`itemName-${i}`]}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <Input
                      name="quantity"
                      id="quantity"
                      label=""
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(item.id, "quantity", e.target.value)
                      }
                    />
                    {errors[`itemQuantity-${i}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`itemQuantity-${i}`]}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <Input
                      name="price"
                      id="price"
                      label=""
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(item.id, "price", e.target.value)
                      }
                    />
                    {errors[`itemPrice-${i}`] && (
                      <p className="text-red-500 text-xs">
                        {errors[`itemPrice-${i}`]}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 flex justify-center items-center dark:text-gray-dark">
                    <p className="">
                      {formatCurrency(+item.quantity * +item.price)}
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
                className="my-5 text-center bg-blue-50 dark:bg-tertiary-dark dark:text-gray-dark hover:dark:bg-tertiary-light transition duration-700 cursor-pointer hover:bg-blue-100 w-full p-4 rounded-b-xl"
              >
                + Add New Item
              </button>
            </ul>
          </div>

          <div className="flex justify-between items-center gap-1">
            <div>
              <Button onClick={(e) => handleCancelCreate(e)} variant="gray">
                Discard
              </Button>
            </div>
            <div className="flex gap-1">
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
