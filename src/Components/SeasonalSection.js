import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const SeasonalSection = () => {
  const [seasonals, setSeasonals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeasonals = async () => {
      try {
        const res = await api.get("/seasonals");
        setSeasonals(res.data);
      } catch (err) {
        console.log("Seasonal error:", err);
      }
    };

    fetchSeasonals();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-center mb-10">
        Seasonal Fruits 🌦️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {seasonals.map((season) => (
          <div
            key={season._id}
            onClick={() => navigate(`/seasonal/${season.slug}`)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg relative group"
          >
            <img
              src={`http://localhost:5000${season.image}`}
              alt={season.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
            />

            <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white">
              <h3 className="text-2xl font-semibold mb-3">
                {season.name}
              </h3>

              <button className="bg-green-600 px-5 py-2 rounded hover:bg-green-700">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeasonalSection;