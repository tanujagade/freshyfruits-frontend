import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api";
import FruitCard from "../Components/FruitCard";
import { CartContext } from "../context/CartContext";

const CategoryPage = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/products/category/${slug}`
        );

        setProducts(response.data || []);
      } catch (err) {
        console.error("Category fetch error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  return (
    <div className="bg-green-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10 capitalize">
          {slug?.replace(/-/g, " ")}
        </h1>

        {loading ? (
          <div className="text-center text-lg">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No products found in this category
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <FruitCard
                key={product._id}
                fruit={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;