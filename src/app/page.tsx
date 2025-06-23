import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/cards/CategoryCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        {/* Hero Section */}
        <section className="text-center py-24 px-4 md:px-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Book the Stars of Your Event
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Singers, DJs, Dancers, and Speakers — all in one place.
          </p>
          <a
            href="/artists"
            className="mt-8 inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Explore Artists
          </a>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 md:px-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard name="Singers" image="/images/singer.jpg" />
            <CategoryCard name="Dancers" image="/images/dancer.jpg" />
            <CategoryCard name="DJs" image="/images/dj.jpg" />
            <CategoryCard name="Speakers" image="/images/speaker.jpg" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
