import { useEffect, useState } from "react";

function Sidebar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  return (
    <div className="flex-1 bg-tertiary-dark md:rounded-r-2xl flex justify-between md:flex-col md:min-h-screen md:max-h-screen">
      <div className="flex justify-center items-center p-3 px-6 bg-primary-dark rounded-r-2xl">
        <img src="../logo.svg" alt="logo" />
      </div>
      <div className="flex md:flex-col gap-6 md:p-4">
        <button
          onClick={() => toggleTheme()}
          className="cursor-pointer md:p-2 md:pb-4 flex justify-center items-center border-b border-b-gray-dark"
        >
          {dark ? (
            <img
              src="../icon-moon.svg"
              alt="theme-moon-icon"
              className="md:size-4"
            />
          ) : (
            <img
              src="../icon-sun.svg"
              alt="theme-moon-icon"
              className="md:size-4"
            />
          )}
        </button>
        <button className="cursor-pointer flex justify-center items-center md:py-2 pl-8 pr-4 py-4 border-l md:border-l-0 border-l-gray-400">
          <img
            src="../image-avatar.jpg"
            alt="image-avatar"
            className="rounded-full size-8  "
          />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
