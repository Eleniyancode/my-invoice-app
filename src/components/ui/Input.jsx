import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
}) => {
  const baseStyles =
    "w-full rounded-lg border px-4 py-2 text-sm transition duration-200 outline-none font-sans font-bold dark:bg-tertiary-dark";

  const stateStyles = error
    ? "border-red-500 focus:border-red-500"
    : value
      ? "border-gray-dark text-tertiary-dark dark:text-gray-dark font-bold focus:border-gray-dark focus:dark:bg-tertiary-light"
      : "border-gray-light  text-tertiary-dark dark:text-gray-dark focus:border-gray-light focus:dark:bg-tertiary-light";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-primary-light"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${stateStyles} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } dark:text-gray-dark`}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
