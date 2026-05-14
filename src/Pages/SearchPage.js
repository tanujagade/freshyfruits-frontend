import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import FruitCard from "../Components/FruitCard";

const SearchPage = () => {
  const { query } = useParams();

  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/products/search/${query}`);

        setFruits(res.data || []);
      } catch (err) {
        console.log(err);
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{query || ""}"
      </h1>

      {/* LOADING */}
      {loading ? (
        <p>Searching...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* EMPTY STATE */}
          {fruits.length === 0 ? (
            <p>No fruits found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fruits.map((fruit) => (
                <FruitCard
                  key={fruit._id}
                  fruit={fruit}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default SearchPage;