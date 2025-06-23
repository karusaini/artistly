type Props = {
  name: string;
  category: string;
  location: string;
  fee: string;
};

export default function ArtistCard({ name, category, location, fee }: Props) {
  return (
    <div className="border rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition text-center text-black">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-700">
        {category} • {location}
      </p>
      <p className="mt-2 font-medium">{fee}</p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer">
        Ask for Quote
      </button>
    </div>
  );
}
