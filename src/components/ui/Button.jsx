export default function Button({ variant = "primary", onClick, children }) {
  const base =
    "px-4 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-primary-dark hover:bg-primary-light text-white hover:bg-secondary ",
    secondary: "bg-secondary-light hover:bg-secondary-dark text-white",
    tertiary: "bg-tertiary-light hover:bg-tertiary-dark text-white",
    gray: "bg-gray-200 hover:bg-gray-dark text-primary-dark",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
