import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log("Category error:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mt-10 mx-auto px-4 py-14 bg-lime-300">
      <h2 className="text-3xl font-bold text-center mb-10">
        Explore Fruit Categories 🍓
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/category/${cat.slug}`)}
            className="group cursor-pointer rounded-xl overflow-hidden shadow-lg relative"
          >
            <img
              src={`http://localhost:5000${cat.image}`}
              alt={cat.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-semibold mb-3">
                {cat.name}
              </h3>
              <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;