import { useState } from "react";
import { signUp } from "./services/auth";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";
import Spinner from "../components/ui/Spinner";
import { toast } from "react-toastify";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      await signUp(formData.email, formData.password);
      navigate("/login"); // redirect after signup
      toast.success("Account created successfully 🚀");
    } catch (err) {
      setError(err.message);
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
              Create Account
            </h2>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-light mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:text-gray-light rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-light mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:text-gray-light rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Create a password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-light mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:text-gray-dark rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Confirm password"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                {loading ? <Spinner /> : <span>Sign Up</span>}
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 dark:text-gray-light mt-6">
              Already have an account?
              <Link to="/login">
                <span className="text-purple-600 font-medium cursor-pointer hover:underline">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </Main>
    </div>
  );
}
