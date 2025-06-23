"use client";

import { useState } from "react";
import data from "@/app/data/artists.json";
import ArtistCard from "@/components/cards/ArtistCard";
import FilterBlock from "@/components/filters/FilterBlock";
import Navbar from "@/components/layout/Navbar";
import { Frown } from "lucide-react";

export default function ArtistsPage() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [artists] = useState(data);

  const categories = ["Singer", "Dancer", "DJ", "Speaker"];
  const locations = [...new Set(data.map((a) => a.location))];
  const priceRanges = ["0-5000", "5000-10000", "10000+"];

  const filtered = artists.filter((artist) => {
    const fee = parseInt(artist.fee.replace(/[^0-9]/g, ""), 10);

    const matchCategory = category === "" || artist.category === category;
    const matchLocation = location === "" || artist.location === location;

    let matchPrice = true;
    if (priceRange === "0-5000") matchPrice = fee <= 5000;
    else if (priceRange === "5000-10000")
      matchPrice = fee > 5000 && fee <= 10000;
    else if (priceRange === "10000+") matchPrice = fee > 10000;

    return matchCategory && matchLocation && matchPrice;
  });

  const resetFilters = () => {
    setCategory("");
    setLocation("");
    setPriceRange("");
  };

  return (
    <>
      <Navbar />
      <main className="px-4 py-8 max-w-6xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Explore Artists
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <FilterBlock
            label="Category"
            options={categories}
            value={category}
            onChange={setCategory}
          />
          <FilterBlock
            label="Location"
            options={locations}
            value={location}
            onChange={setLocation}
          />
          <FilterBlock
            label="Price Range"
            options={priceRanges}
            value={priceRange}
            onChange={setPriceRange}
          />
          <button
            onClick={resetFilters}
            className="border border-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-100 transition text-sm cursor-pointer"
          >
            Clear Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
            <Frown size={48} className="mb-4 animate-bounce" />
            <p className="text-lg">
              No artists found with the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                category={artist.category}
                location={artist.location}
                fee={artist.fee}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
