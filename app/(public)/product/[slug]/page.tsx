
"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { useTopupStore } from "@/stores/useTopupStore";
import { PhoneInput } from "@/components/topup/phone-input";
import { PriceSelector } from "@/components/topup/price-selector";
import { PaymentSelector } from "@/components/topup/payment-selector";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // Assuming sonner is installed as per package.json

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrapping params for Next.js 15/16
  const { slug } = use(params);
  const router = useRouter();
  
  const product = PRODUCTS.find((p) => p.slug === slug);
  
  // Zustand State
  const { 
    setProduct,
    userId, setUserId,
    selectedNominalId, setNominal,
    selectedPaymentId, setPayment,
    reset
  } = useTopupStore();

  // Reset state when mounting a new product, or sync if returning? 
  // For a clean flow, let's just make sure we set the product slug.
  useEffect(() => {
    if (product) {
       setProduct(product.slug);
       // Optional: Don't hard reset everything to allow back navigation without losing data, 
       // but maybe reset on unmount or initial mount if needed. 
       // For now, we trust the store is persistent enough during the session.
    }
  }, [product, setProduct]);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const handleCheckout = () => {
    if (!userId) {
        toast.error("Mohon isi User ID terlebih dahulu");
        return;
    }
    if (!selectedNominalId) {
        toast.error("Mohon pilih nominal top up");
        return;
    }
    if (!selectedPaymentId) {
        toast.error("Mohon pilih metode pembayaran");
        return;
    }
    router.push("/checkout");
  };

  return (
    <div className="pb-20">
      {/* Header / Banner */}
      <div className="relative h-48 md:h-64 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        {/* Real implementation would use the banner image from mock data if available */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <h1 className="text-6xl font-bold text-white">{product.name}</h1>
        </div>
        
        <div className="absolute top-4 left-4 z-20">
            <Link href="/">
                <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur border-none hover:bg-background/80">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
            </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Info */}
            <div className="lg:col-span-1">
                <div className="bg-card border rounded-2xl p-6 shadow-lg sticky top-24">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-muted mb-4 shadow-md mx-auto lg:mx-0">
                         <Image 
                            src={product.image}
                            alt={product.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                         />
                    </div>
                    <h1 className="text-2xl font-bold text-center lg:text-left">{product.name}</h1>
                    <p className="text-muted-foreground text-sm text-center lg:text-left mb-4">{product.developer}</p>
                    <div className="text-sm text-muted-foreground border-t pt-4">
                        <p>Proses top up otomatis 1-3 detik. Masukkan User ID, pilih nominal, lakukan pembayaran, dan diamonds akan langsung masuk.</p>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. User ID */}
                <section className="bg-card border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                        <h2 className="text-xl font-bold">Masukkan Data Akun</h2>
                    </div>
                    <PhoneInput value={userId} onChange={setUserId} />
                </section>

                {/* 2. Nominal */}
                <section className="bg-card border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                        <h2 className="text-xl font-bold">Pilih Nominal</h2>
                    </div>
                    <PriceSelector 
                        nominals={product.nominals} 
                        selectedId={selectedNominalId} 
                        onSelect={setNominal} 
                    />
                </section>

                {/* 3. Payment */}
                <section className="bg-card border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                        <h2 className="text-xl font-bold">Pembayaran</h2>
                    </div>
                    <PaymentSelector 
                        selectedId={selectedPaymentId}
                        onSelect={setPayment}
                    />
                </section>

                {/* 4. Action */}
                <section className="bg-card border rounded-2xl p-6 shadow-sm sticky bottom-4 z-30 lg:static">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground hidden md:block">
                            Pastikan data anda benar sebelum melanjutkan.
                        </div>
                        <Button size="lg" className="w-full md:w-auto px-8 rounded-full font-bold text-lg" onClick={handleCheckout}>
                            Lanjut Pembayaran
                        </Button>
                     </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
}
