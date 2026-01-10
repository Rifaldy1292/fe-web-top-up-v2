
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function CheckTransactionPage() {
  const router = useRouter();
  const [invoice, setInvoice] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (invoice.trim()) {
        router.push(`/status/${invoice.trim()}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-lg">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Cek Transaksi</h1>
        <p className="text-muted-foreground">
            Lacak status pambelian anda dengan memasukkan nomor invoice.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="text-base">Masukkan Nomor Invoice</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleCheck} className="flex gap-2">
                <Input 
                    placeholder="Contoh: INV-2024..." 
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="text-lg h-12"
                />
                <Button type="submit" size="icon" className="h-12 w-12 shrink-0">
                    <Search className="w-5 h-5" />
                </Button>
            </form>
             <p className="text-xs text-muted-foreground mt-4">
                *Invoice ID bisa dilihat pada halaman pembayaran atau bukti transfer.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
