import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  name: string;
  category: string;
  location: string;
  fee: string;
};

export default function ArtistCard({ name, category, location, fee }: Props) {
  return (
    <Card className="text-center text-black hover:shadow-md transition">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {category} • {location}
        </p>
        <p className="mt-2 font-medium">{fee}</p>
        <Button className="mt-6 cursor-pointer hover:bg-gray-700 ">
          Ask for Quote
        </Button>
      </CardContent>
    </Card>
  );
}
