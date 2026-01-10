

"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/topup/status-badge";
import { TransactionStatus } from "@/stores/useTopupStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function TransactionsPage() {
  const router = useRouter();
  const { isAuthenticated, transactions } = useAdminStore();
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const filteredTransactions = transactions.filter(t => {
      const matchStatus = filter === "ALL" || t.status === filter;
      const matchSearch = t.invoiceId.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search invoice..."
                    className="pl-8 w-[200px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SUCCESS">Success</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                                No results found.
                            </TableCell>
                        </TableRow>
                    ) : filteredTransactions.map((trx) => (
                        <TableRow 
                            key={trx.invoiceId} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => router.push(`/admin/transactions/${trx.invoiceId}`)}
                        >
                            <TableCell className="font-medium">{trx.invoiceId}</TableCell>
                            <TableCell>{new Date(trx.date).toLocaleDateString()}</TableCell>
                            <TableCell>{trx.productName}</TableCell>
                            <TableCell>{trx.nominalName}</TableCell>
                            <TableCell>Rp {trx.price.toLocaleString('id-ID')}</TableCell>
                            <TableCell>{trx.paymentMethod}</TableCell>
                            <TableCell>
                                <StatusBadge status={trx.status as TransactionStatus} />
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            {/* Pagination Dummy */}
            <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
                <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">Page 1 of 1</div>
                <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
