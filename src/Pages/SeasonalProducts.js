import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FruitCard from "../Components/FruitCard";

const BASE_URL = "https://freshyfruits-backend.onrender.com";

const SeasonalProducts = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeasonal = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${BASE_URL}/api/products/seasonal/${slug}`
        );

        setProducts(res.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load seasonal products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSeasonal();
    }
  }, [slug]);

  const addToCart = (fruit, kg) => {
    console.log("Added to cart:", fruit.name, kg);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {slug} Fruits
      </h2>

      {/* LOADING */}
      {loading ? (
        <p>Loading seasonal fruits...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* EMPTY STATE */}
          {products.length === 0 ? (
            <p>No seasonal fruits found</p>
          ) : (
            products.map((fruit) => (
              <FruitCard
                key={fruit._id}
                fruit={fruit}
                addToCart={addToCart}
              />
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default SeasonalProducts;