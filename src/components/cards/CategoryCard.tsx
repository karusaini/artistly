import Image from "next/image";

type Props = {
  name: string;
  image: string;
};

export default function CategoryCard({ name, image }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-3 bg-white text-center font-medium text-black">
        {name}
      </div>
    </div>
  );
}
