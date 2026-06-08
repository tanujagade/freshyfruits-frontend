import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    if (!data.email || !data.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://freshyfruits-backend.onrender.com/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);

      setData({
        email: "",
        password: "",
      });

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600">
          Welcome Back 🍎
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to FreshyFruits
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-4 relative">
          <label className="text-sm text-gray-600">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            onKeyDown={handleKeyDown}
          />

          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}