import { useState } from "react";
import { login } from "./services/auth";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/dashboard"); // redirect after login
      toast.success("Welcome back 👋");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-light dark:bg-tertiary-light transition duration-300 flex flex-col md:flex-row md:min-h-screen">
      <div>
        <Sidebar />
      </div>
      <Main>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-tertiary-dark px-4">
          <div className="w-full max-w-md bg-white dark:bg-tertiary-light rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-light">
              Welcome Back
            </h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-light mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:text-gray-light rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-light mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:text-gray-light rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                {loading ? <Spinner /> : <span>Login</span>}
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 dark:text-gray-light mt-6">
              Don’t have an account?
              <Link to="/signup">
                <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </Main>
    </div>
  );
}
