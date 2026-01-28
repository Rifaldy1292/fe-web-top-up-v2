"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTopupStore } from "@/stores/useTopupStore";
import { PRODUCTS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/topup/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Copy, Home, Share2 } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getStatusTransaction } from "./services";

export default function StatusPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId: routeInvoiceId } = use(params);
  const setLoading = useTopupStore((state) => state.setLoading);
  const {
    transactionStatus,
    userId,
    selectedProductSlug,
    selectedNominalId,
    checkTransaction,
  } = useTopupStore();
  const invoiceId = useParams().invoiceId;

  // useEffect(() => {
  //   if (routeInvoiceId && (!invoiceId || invoiceId !== routeInvoiceId)) {
  //     checkTransaction(routeInvoiceId);
  //   }
  // }, [routeInvoiceId, invoiceId, checkTransaction]);

  useEffect(() => {
    setLoading(false);
  }, []);
  // Find info (In real app, we would fetch transaction detail by ID.
  // Here we rely on store state persistence or mock matching)
  // For safety in this "no-backend" mock: fallback to mock data or store
  const product =
    PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];
  const nominal =
    product.nominals.find((n) => n.id === selectedNominalId) ||
    product.nominals[0];

  const mapStatusToLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Menunggu Pembayaran";
      case "SUCCESS":
        return "Berhasil";
      case "FAILED":
        return "Gagal";
      case "EXPIRED":
        return "Kedaluwarsa";
      default:
        return "";
    }
  };

  const mapStatusToLabelPacket = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Dalam Proses Pengiriman";
      case "SUCCESS":
        return "Berhasil";
      case "FAILED":
        return "Gagal";
      case "EXPIRED":
        return "Kedaluwarsa";
      default:
        return "PENDING";
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(invoiceId as string);
    toast.success("Invoice ID copied!");
  };

  const {
    data: dataTransactions,
    isLoading,
    isError,
    isSuccess: isSuccessGetNickname,
  } = useQuery({
    queryKey: [invoiceId],
    queryFn: () => getStatusTransaction(invoiceId as string),
    enabled: Boolean(invoiceId),
    retry: false, // ⬅️ PENTING
  });
  console.log(dataTransactions, invoiceId);
  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-muted mb-4">
          {/* Dynamic Icon */}
          {dataTransactions?.status === "SUCCESS" ? (
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Check className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
              <StatusBadge
                status={dataTransactions?.status || ""}
                className="border-none bg-transparent scale-150 p-0"
              />
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-1">
          {dataTransactions?.status === "SUCCESS"
            ? "Pembelian Berhasil!"
            : "Status Transaksi"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {dataTransactions?.status === "SUCCESS"
            ? "Top up telah masuk ke akun anda."
            : "Pantau status transaksi anda secara berkala."}
        </p>
      </div>

      <Card className="border-2 shadow-sm">
        <CardContent className="pt-6">
          <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between mb-6 border">
            <div>
              <p className="text-xs text-muted-foreground">Invoice ID</p>
              <p className="font-mono font-bold text-sm">{invoiceId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Status Pembayaran
              </span>
              <StatusBadge
                status={mapStatusToLabel(dataTransactions?.status || "")}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Status Pengiriman
              </span>
              <StatusBadge
                status={mapStatusToLabelPacket(
                  dataTransactions?.packetStatus || "",
                )}
              />
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Layanan</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded-full overflow-hidden relative">
                  <Image
                    src={product.image}
                    fill
                    alt=""
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-sm">{product.name}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Item Info</span>
              <span className="font-bold text-sm">{nominal.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">User ID</span>
              <span className="font-mono font-bold text-sm">
                {userId || "-"}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              {/* <span className="text-sm text-muted-foreground">Waktu</span>
              <span className="text-sm">{new Date().toLocaleString("id-ID")}</span> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Link href="/">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" /> Ke Beranda
          </Button>
        </Link>
        <Button className="w-full h-12 rounded-xl" size="lg">
          <Share2 className="w-4 h-4 mr-2" /> Simpan Bukti
        </Button>
      </div>
    </div>
  );
}
