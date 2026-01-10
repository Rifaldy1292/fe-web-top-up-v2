
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTopupStore } from "@/stores/useTopupStore";
import { PAYMENT_METHODS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const router = useRouter();
  const { 
    invoiceId, transactionStatus, selectedPaymentId 
  } = useTopupStore();

  const payment = PAYMENT_METHODS.find(p => p.id === selectedPaymentId);

  useEffect(() => {
    if (!invoiceId) {
        router.replace("/");
    }
  }, [invoiceId, router]);

  // Auto redirect when status changes to PAID or PROCESSING
  useEffect(() => {
    if (transactionStatus === 'PAID' || transactionStatus === 'PROCESSING' || transactionStatus === 'SUCCESS') {
        router.push(`/status/${invoiceId}`);
    }
  }, [transactionStatus, invoiceId, router]);

  if (!invoiceId || !payment) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl text-center">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Instruksi Pembayaran</h1>
        <p className="text-muted-foreground">Selesaikan pembayaran sebelum waktu habis.</p>
      </div>

      <div className="bg-orange-500/10 text-orange-600 rounded-lg p-4 mb-8 flex items-center justify-center gap-2 font-mono font-bold">
        <Clock className="w-5 h-5" />
        <span>00:14:59</span> {/* Static for now, could be dynamic */}
      </div>

      <Card className="text-left border-2">
        <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                {payment.name}
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <label className="text-xs text-muted-foreground block mb-2">Nomor Virtual Account / Tujuan</label>
                <div className="flex gap-2">
                    <div className="flex-1 bg-muted p-3 rounded-lg font-mono text-lg font-bold tracking-widest text-center truncate">
                        1234 5678 9012 3456
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div>
                 <label className="text-xs text-muted-foreground block mb-2">Total Tagihan</label>
                 <div className="flex gap-2">
                    <div className="flex-1 bg-muted p-3 rounded-lg font-mono text-lg font-bold text-center">
                        Rp 50.000 {/* Hardcoded for view, real app would use selected nominal */}
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Alert>
                <AlertTitle>Cara Bayar</AlertTitle>
                <AlertDescription className="text-xs mt-2 text-muted-foreground list-decimal pl-4">
                    <li>Buka aplikasi {payment.name}</li>
                    <li>Pilih menu Transfer / Bayar</li>
                    <li>Masukkan nomor tujuan di atas</li>
                    <li>Pastikan nominal sesuai hingga 3 digit terakhir</li>
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

      <div className="mt-8 opacity-50 relative">
         <div className="absolute inset-x-0 top-1/2 border-t" />
         <span className="relative bg-background px-4 text-xs text-muted-foreground">Menunggu Pembayaran Otomatis</span>
      </div>
      
      <div className="mt-4">
          <p className="text-xs text-muted-foreground animate-pulse">
              Halaman akan otomatis update setelah pembayaran diterima...
          </p>
      </div>
    </div>
  );
}
