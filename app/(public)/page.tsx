
import { PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import { ProductCard } from '@/components/topup/product-card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 md:py-20 rounded-b-[3rem]">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                TOP UP GAME <br className="hidden md:block"/>
                <span className="text-primary">TERMURAH, TERCEPAT!</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Platform top up terpercaya untuk berbagai game favoritmu. Proses instan, pembayaran aman, dan harga bersahabat.
            </p>
            <div className="flex gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 font-bold text-md">
                    Mulai Belanja
                </Button>
                <Button size="lg" variant="secondary" className="rounded-full px-8 font-bold text-md">
                    Cek Transaksi
                </Button>
            </div>
        </div>
      </section>

      {/* Category Filter (Visual Only for now) */}
      <section className="container mx-auto px-4 mt-12 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <Button variant="default" className="rounded-full">Semua</Button>
            {CATEGORIES.map(cat => (
                <Button key={cat.id} variant="outline" className="rounded-full whitespace-nowrap">
                    {cat.name}
                </Button>
            ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4">
        <h2 className="font-bold text-2xl mb-6">Populer Sekarang</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {PRODUCTS.map((product) => (
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image}
                    developer={product.developer}
                />
            ))}
        </div>
      </section>
    </div>
  );
}
