"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/cards/CategoryCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        <section className="text-center py-24 px-4 md:px-10 mt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Book the Stars of Your Event
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Singers, DJs, Dancers, and Speakers — all in one place.
          </p>
          <Button
            asChild
            className="mt-10 text-lg px-8 py-6 rounded-full hover:bg-gray-700"
            variant="default"
          >
            <a href="/artists">Explore Artists</a>
          </Button>
        </section>

        <Separator className="my-12 max-w-4xl mx-auto" />

        <section className="py-16 px-4 md:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 justify-center">
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
