import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  //   Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 ">
      {/* 🔥 Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      ></div>

      {/* 🔥 Modal Content */}
      <div className="relative z-10 w-full md:max-w-[50%] bg-white dark:bg-tertiary-light md:rounded-r-3xl shadow-xl animate-in fade-in zoom-in duration-200">
        {children}
      </div>
    </div>
  );
};

export default Modal;
