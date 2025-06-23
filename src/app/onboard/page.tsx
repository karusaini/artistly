import Navbar from "@/components/layout/Navbar";
import ArtistForm from "@/components/forms/ArtistForm";

export default function OnboardPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-black mt-20">
          Become an Artist
        </h1>
        <ArtistForm />
      </main>
    </>
  );
}
