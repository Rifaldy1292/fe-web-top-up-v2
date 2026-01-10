
"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const { isAuthenticated, paymentMethods, togglePaymentStatus } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
      </div>

      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paymentMethods.map((method) => (
                        <TableRow key={method.id}>
                            <TableCell className="font-mono text-xs">{method.icon}</TableCell>
                            <TableCell className="font-medium">{method.name}</TableCell>
                            <TableCell>Rp {method.fee.toLocaleString('id-ID')}</TableCell>
                            <TableCell>
                                <Badge variant={method.status === 'ACTIVE' ? 'outline' : 'destructive'}>
                                    {method.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Switch 
                                    checked={method.status === 'ACTIVE'}
                                    onCheckedChange={() => togglePaymentStatus(method.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
