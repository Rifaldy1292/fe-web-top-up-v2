import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  // developer: string;
}

export function ProductCard({ name, slug, image, id }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}?id=${id}`} className="group">
      <Card className="overflow-hidden border-none shadow-none bg-transparent hover:scale-105 transition-transform duration-300">
        <CardContent className="p-0">
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-muted">
            {/* Fallback color if image is missing, technically Next/Image needs real SRC so we might see broken img icon if mock data path is invalid, but for now this is structure */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
              {/* <p className="text-xs font-medium opacity-80">tes</p> */}
              <h3 className="font-bold text-lg leading-tight">{name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
