"use client";

import { useState } from "react";

interface Artist {
  id: number;
  name: string;
  category: string;
  location: string;
  fee: string;
}

interface Props {
  data: Artist[];
}

export default function ArtistTable({ data }: Props) {
  const [artists, setArtists] = useState(data);

  const handleAction = (id: number) => {
    setArtists(artists.filter((artist) => artist.id !== id));
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-black text-white">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Category</th>
            <th className="text-left px-4 py-2">Location</th>
            <th className="text-left px-4 py-2">Fee</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No artists found
              </td>
            </tr>
          ) : (
            artists.map((artist) => (
              <tr key={artist.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{artist.name}</td>
                <td className="px-4 py-3">{artist.category}</td>
                <td className="px-4 py-3">{artist.location}</td>
                <td className="px-4 py-3">{artist.fee}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAction(artist.id)}
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 cursor-pointer"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
