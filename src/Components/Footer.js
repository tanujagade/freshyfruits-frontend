import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/footer")
      .then(res => setFooter(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-green-900 text-white mt-20">

      {/* TOP */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 py-12">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-bold mb-3">FruitShop</h2>
          <p className="text-gray-300">
            {footer.aboutText}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            {footer.quickLinks.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="hover:text-green-400">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h2 className="text-xl font-bold mb-3">Categories</h2>
          <ul className="space-y-2">
            {footer.categories.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="hover:text-green-400">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p>Email: {footer.contact.email}</p>
          <p>Phone: {footer.contact.phone}</p>
          <p>Address: {footer.contact.address}</p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4">
            <a href={footer.socialLinks.instagram}>Instagram</a>
            <a href={footer.socialLinks.facebook}>Facebook</a>
            <a href={footer.socialLinks.twitter}>Twitter</a>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center py-4 bg-green-950">
        © {new Date().getFullYear()} FruitShop. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
