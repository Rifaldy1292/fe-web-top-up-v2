
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function ProvidersPage() {
  const router = useRouter();
  const { isAuthenticated, providers, toggleProviderStatus, updateProvider } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Providers</h2>
      </div>

      <div className="grid gap-6">
          {providers.map((provider) => (
             <Card key={provider.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-lg font-bold flex items-center gap-3">
                        {provider.name}
                        <Badge variant={provider.status === 'ONLINE' ? 'default' : 'destructive'}>
                            {provider.status}
                        </Badge>
                   </CardTitle>
                   <Switch 
                        checked={provider.status === 'ONLINE'}
                        onCheckedChange={() => toggleProviderStatus(provider.id)}
                   />
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Balance</label>
                             <div className="text-2xl font-mono font-bold">
                                 Rp {provider.balance.toLocaleString('id-ID')}
                             </div>
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm font-medium">API Key</label>
                             <div className="flex gap-2">
                                <Input 
                                    type="password" 
                                    value={provider.apiKey} 
                                    onChange={(e) => updateProvider(provider.id, { apiKey: e.target.value })}
                                />
                                <Button size="icon" onClick={() => toast.success("API Key saved")}>
                                    <Save className="w-4 h-4" />
                                </Button>
                             </div>
                        </div>
                    </div>
                </CardContent>
             </Card>
          ))}
      </div>
    </div>
  );
}
