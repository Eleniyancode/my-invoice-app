import Main from "../layout/Main";
import Sidebar from "../layout/Sidebar";

function LoadingSpinner() {
  return (
    <div className="bg-gray-light dark:bg-tertiary-light transition duration-300 flex flex-col md:flex-row md:min-h-screen">
      <Sidebar />
      <Main>
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      </Main>
    </div>
  );
}

export default LoadingSpinner;
