import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://freshyfruits-backend.onrender.com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/contact`,
        formData
      );

      setSuccess(res.data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess("");
      }, 5000);

    } catch (error) {
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-800 to-lime-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <img
            src="/favicon.png"
            alt="FreshyFruits"
            className="w-24 h-24 mx-auto bg-white rounded-full p-2 shadow-lg mb-4"
          />

          <h1 className="text-5xl font-bold mb-3">
            Contact FreshyFruits
          </h1>

          <p className="text-lg text-green-100">
            We'd love to hear from you 🍎
          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div>

            <h2 className="text-4xl font-bold text-green-800 mb-6">
              Let's Talk
            </h2>

            <p className="text-gray-700 mb-8 leading-8">
              Have questions about our fruits, orders, delivery, or services?
              Send us a message and our team will respond as soon as possible.
            </p>

            <div className="space-y-5">

              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="font-bold text-green-700 mb-1">
                  📧 Email
                </h3>

                <p className="text-gray-600">
                  gadetanuja5@gmail.com
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="font-bold text-green-700 mb-1">
                  📞 Phone
                </h3>

                <p className="text-gray-600">
                  +91 9876543210
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="font-bold text-green-700 mb-1">
                  📍 Location
                </h3>

                <p className="text-gray-600">
                  Pune, Maharashtra, India
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-md">
                <h3 className="font-bold text-green-700 mb-1">
                  ⏰ Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Sunday | 9 AM - 9 PM
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">

            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Send Message
            </h2>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg mb-5">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-700 to-lime-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                {loading ? "Sending..." : "Send Message 🍎"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;