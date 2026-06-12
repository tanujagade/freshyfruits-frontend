import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL = "https://freshyfruits-backend.onrender.com";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/footer`)
      .then((res) => setFooter(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-green-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-5 gap-10">

          {/* BRAND SECTION */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-4 mb-4">

              <img
                src="/favicon.png"
                alt="FreshyFruits Logo"
                className="w-16 h-16 bg-white rounded-full p-1 shadow-md"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  FreshyFruits
                </h2>

                <p className="text-green-300 text-sm">
                  Freshness in Every Bite 🍎
                </p>
              </div>

            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              {footer.aboutText}
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-2 text-gray-300">
              {footer.quickLinks?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Categories
            </h2>

            <ul className="space-y-2 text-gray-300">
              {footer.categories?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Contact
            </h2>

            <div className="space-y-2 text-gray-300">

              <p>{footer.contact?.email}</p>

              <p>{footer.contact?.phone}</p>

              <p>{footer.contact?.address}</p>

            </div>

            <div className="flex gap-4 mt-4">

              <a
                href={footer.socialLinks?.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 transition"
              >
                Instagram
              </a>

              <a
                href={footer.socialLinks?.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                Facebook
              </a>

              <a
                href={footer.socialLinks?.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition"
              >
                Twitter
              </a>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-green-800 py-4 text-center text-gray-300">
        © {new Date().getFullYear()} FreshyFruits. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;