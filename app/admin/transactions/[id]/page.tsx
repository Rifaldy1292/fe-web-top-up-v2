
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { StatusBadge } from "@/components/topup/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw, Send, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TransactionStatus } from "@/stores/useTopupStore";

export default function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { transactions, updateTransactionStatus } = useAdminStore();
  const [trx, setTrx] = useState<any>(null);

  useEffect(() => {
    const found = transactions.find(t => t.invoiceId === id);
    if (found) {
        setTrx(found);
    } else {
        toast.error("Transaction not found");
        router.push("/admin/transactions");
    }
  }, [id, transactions, router]);

  if (!trx) return null;

  const handleRetry = () => {
    toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
            loading: 'Retrying transaction...',
            success: () => {
                updateTransactionStatus(trx.invoiceId, 'PROCESSING');
                return 'Transaction retry initiated';
            },
            error: 'Failed to retry',
        }
    );
  };

  const handleForceSuccess = () => {
     updateTransactionStatus(trx.invoiceId, 'SUCCESS');
     toast.success("Transaction marked as SUCCESS");
  };
  
  const handleForceFail = () => {
     updateTransactionStatus(trx.invoiceId, 'FAILED');
     toast.success("Transaction marked as FAILED");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">Transaction Detail</h2>
            <p className="text-muted-foreground">{trx.invoiceId}</p>
        </div>
        <div className="flex gap-2">
            {trx.status === 'FAILED' && (
                <Button onClick={handleRetry}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Retry
                </Button>
            )}
             {trx.status === 'PROCESSING' && (
                <Button variant="destructive" onClick={handleForceFail}>
                    Mark Failed
                </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {trx.logs?.map((log: any, i: number) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 bg-slate-50 group-[.is-active]:bg-emerald-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                     <div className="w-3 h-3 bg-current rounded-full" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow bg-card">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900">{log.message}</div>
                                        <time className="font-caveat font-medium text-amber-500">{log.time}</time>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Mock Manual Action log */}
                    {trx.status === 'PROCESSING' && (
                         <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2 text-sm">
                            <RefreshCw className="w-4 h-4 animate-spin" /> System is validating payment...
                         </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Provider Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted p-4 rounded-lg font-mono text-xs overflow-x-auto">
                        <pre>{JSON.stringify({
                            provider: 'DIGIFLAZZ',
                            sku: trx.productId === 'mlbb' ? 'ML-50' : 'UNK',
                            dest: trx.userId,
                            ref_id: trx.invoiceId,
                            rc: trx.status === 'SUCCESS' ? '00' : 'PENDING'
                        }, null, 2)}</pre>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <StatusBadge status={trx.status as TransactionStatus} />
                    </div>
                    <Separator />
                    <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Product</span>
                        <span className="font-medium">{trx.productName}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Item</span>
                        <span className="font-medium">{trx.nominalName}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">User ID</span>
                        <span className="font-mono">{trx.userId}</span>
                    </div>
                    <Separator />
                     <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-bold text-lg">Rp {trx.price.toLocaleString('id-ID')}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Admin Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Callback resent")}>
                        <Send className="w-4 h-4 mr-2" /> Resend Callback
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleForceFail}>
                        <AlertTriangle className="w-4 h-4 mr-2" /> Force Fail
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
