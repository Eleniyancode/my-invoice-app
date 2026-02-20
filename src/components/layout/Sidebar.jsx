function Sidebar() {
  return (
    <div className="flex-1 bg-tertiary-dark rounded-r-2xl flex justify-between flex-col">
      <div className="flex justify-center items-center p-3 bg-primary-dark rounded-r-lg">
        <img src="../logo.svg" alt="logo" />
      </div>
      <div className="flex flex-col p-4">
        <div className="p-4 pb-8 flex justify-center items-center border-b border-b-gray-dark">
          <img
            src="../icon-moon.svg"
            alt="theme-moon-icon"
            className="size-10"
          />
        </div>
        <div className="flex justify-center items-center py-4">
          <img
            src="../image-avatar.jpg"
            alt="image-avatar"
            className="rounded-full size-10 "
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
