import ArtistTable from "@/components/dashboard/ArtistTable";
import artists from "@/app/data/artists.json";
import Navbar from "@/components/layout/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black mt-20 text-center">
          Manager Dashboard
        </h1>
        <ArtistTable data={artists} />
      </main>
    </>
  );
}
