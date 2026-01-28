"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTopupStore } from "@/stores/useTopupStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createTopUpTransaction } from "./service";

interface Window {
  snap: {
    pay: (
      token: string,
      callbacks: {
        onSuccess?: (result: any) => void;
        onPending?: (result: any) => void;
        onError?: (result: any) => void;
        onClose?: () => void;
      },
    ) => void;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    phoneNumber,
    selectedListPacket,
    selectedProductSlug,
    userId,
    selectedNominalId,
    selectedPaymentId,
    createTransaction,
  } = useTopupStore();
  const setLoading = useTopupStore((state) => state.setLoading);
  const [isLoading, setIsLoading] = useState(false);

  // Hydrate data
  const product = selectedProductSlug;
  const nominal = selectedListPacket.name;
  const payment = selectedPaymentId;

  const orderId = useSearchParams().get("order_id");
  useEffect(() => {
    if (orderId) {
      setLoading(true);
      router.replace(`/status/${orderId}`);
    }
  }, []);

  useEffect(() => {
    // hanya di client, optional preload Snap JS
    const loadSnap = async () => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute(
        "data-client-key",
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
      );
      document.body.appendChild(script);
    };
    loadSnap();
  }, []);

  //   useEffect(() => {
  //     if (!product || !nominal || !payment || !userId) {
  //         router.replace("/");
  //     }
  //   }, [product, nominal, payment, userId, router]);

  //   if (!product || !nominal || !payment) return null;

  const totalPrice = 15000;

  const handleConfirm = async () => {
    if (!selectedListPacket.price) {
      router.push("/");
    }
    setIsLoading(true);
    try {
      const res = await createTopUpTransaction({
        amount: selectedListPacket.price,
        sku: selectedListPacket.product_digiflazz_id,
        customerNo: phoneNumber || "089514636994",
      });

      // Response sukses → ambil token
      const { token } = res.data.data;

      // Panggil Snap JS untuk tampilkan payment popup
      (window as any).snap.pay(token, {
        onSuccess: (result: any) => {
          console.log("Payment Success:", result);
          // update state transaksi → SUCCESS
        },
        onPending: (result: any) => {
          console.log("Payment Pending:", result);
        },
        onError: (result: any) => {
          console.log("Payment Error:", result);
        },
        onClose: () => {
          console.log("User closed the payment popup");
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center md:text-left">
      <div className="flex">
        <Button
          disabled={isLoading}
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Kembali
        </Button>
      </div>

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
            <span className="font-semibold">{product}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Item</span>
            <span className="font-semibold">{nominal}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Metode Bayar</span>
            <span className="font-semibold">{payment}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Harga</span>
            <span>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(selectedListPacket.price)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Biaya Admin 5%</span>
            <span>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(selectedListPacket.price * 0.05)}
            </span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Bayar</span>
            <span className="text-primary">
              Rp {(selectedListPacket.price * 1.05).toLocaleString("id-ID")}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button
          size="lg"
          className="w-full rounded-full font-bold text-lg"
          onClick={() => void handleConfirm()}
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
