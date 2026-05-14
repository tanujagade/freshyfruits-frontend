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

        const res = await api.get(`/products/category/${slug}`);

        setProducts(res.data || []);
      } catch (error) {
        console.log("Product fetch error:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  return (
    <div className="bg-green-50 min-h-screen p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {slug ? slug.replace("-", " ") : "Category"}
      </h1>

      {/* LOADING */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {products.length === 0 ? (
            <p className="col-span-full text-center">
              No products found
            </p>
          ) : (
            products.map((product) => (
              <FruitCard
                key={product._id}
                fruit={product}
                addToCart={addToCart}
              />
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default CategoryPage;