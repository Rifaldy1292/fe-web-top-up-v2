
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTopupStore } from "@/stores/useTopupStore";
import { PRODUCTS, PAYMENT_METHODS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    selectedProductSlug, userId, 
    selectedNominalId, selectedPaymentId,
    createTransaction
  } = useTopupStore();

  const [isLoading, setIsLoading] = useState(false);

  // Hydrate data
  const product = PRODUCTS.find(p => p.slug === selectedProductSlug);
  const nominal = product?.nominals.find(n => n.id === selectedNominalId);
  const payment = PAYMENT_METHODS.find(p => p.id === selectedPaymentId);

  useEffect(() => {
    if (!product || !nominal || !payment || !userId) {
        router.replace("/");
    }
  }, [product, nominal, payment, userId, router]);

  if (!product || !nominal || !payment) return null;

  const totalPrice = nominal.price + payment.fee;

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        createTransaction(); // This sets invoiceId in store and status to INIT
        router.push("/payment");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center md:text-left">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
        <ArrowLeft className="mr-2 w-4 h-4" /> Kembali
      </Button>

      <h1 className="text-2xl font-bold mb-6">Konfirmasi Pesanan</h1>

      <Card className="border-2">
        <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-lg">Detail Transaksi</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono font-medium">{userId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Produk</span>
                <span className="font-semibold">{product.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Item</span>
                <span className="font-semibold">{nominal.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Metode Bayar</span>
                <span className="font-semibold">{payment.name}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Harga</span>
                <span>Rp {nominal.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Biaya Admin</span>
                <span>Rp {payment.fee.toLocaleString('id-ID')}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Bayar</span>
                <span className="text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button 
            size="lg" 
            className="w-full rounded-full font-bold text-lg" 
            onClick={handleConfirm}
            disabled={isLoading}
        >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {isLoading ? "Memproses..." : "Bayar Sekarang"}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-4">
            Dengan melanjutkan, saya menyetujui syarat & ketentuan yang berlaku.
        </p>
      </div>
    </div>
  );
}
