import { useNavigate } from "react-router-dom";

function DeleteInvoiceForm({
  deleteInvoice,
  deletingInvoice,
  setDeletingInvoice,
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔥 Overlay */}
      <div
        onClick={() => setDeletingInvoice(null)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      {/* 🔥 Modal Content */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirm Deletion</h3>
          <p>Are you sure you want to delete invoice #{deletingInvoice.id}?</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeletingInvoice(null)}
              className="px-4 py-2 border rounded cursor-pointer hover:bg-amber-100 hover:border-0 transition duration-200"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                deleteInvoice(deletingInvoice.id);
                setDeletingInvoice(null);
                navigate(-1);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400 transition duration-500 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteInvoiceForm;
