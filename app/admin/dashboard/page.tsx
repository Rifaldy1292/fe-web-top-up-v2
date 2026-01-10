
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { ADMIN_STATS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, Receipt, ShoppingCart, Users } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Rp {ADMIN_STATS.totalRevenue.toLocaleString('id-ID')}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{ADMIN_STATS.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
        </Card>
        
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{ADMIN_STATS.successRate}%</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
        
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{ADMIN_STATS.pendingTransactions}</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Chart Mockup Placeholder
                </div>
            </CardContent>
        </Card>
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-4">
                     {[1,2,3].map(i => (
                         <div key={i} className="flex items-center">
                             <div className="ml-4 space-y-1">
                                 <p className="text-sm font-medium leading-none">INV-2024-{i}</p>
                                 <p className="text-sm text-muted-foreground">Mobile Legends</p>
                             </div>
                             <div className="ml-auto font-medium">+Rp 14.000</div>
                         </div>
                     ))}
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
