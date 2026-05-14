import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const BASE_URL = "https://freshyfruits-backend.onrender.com";

export default function Signup() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/api/auth/signup`,
        data
      );

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-green-600">
          Create Account 🍏
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join FreshyFruits today
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            placeholder="Your name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <label className="text-sm text-gray-600">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow" />
        </div>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}