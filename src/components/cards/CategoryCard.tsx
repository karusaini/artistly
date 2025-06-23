import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  image: string;
};

export default function CategoryCard({ name, image }: Props) {
  return (
    <Card className="group overflow-hidden p-0 shadow hover:shadow-lg transition cursor-pointer">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="text-center bg-white py-3">
        <CardTitle className="text-base font-medium text-black">
          {name}
        </CardTitle>
      </CardContent>
    </Card>
  );
}
