
"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export default function LogsPage() {
  const router = useRouter();
  const { isAuthenticated, logs } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>

      <div className="space-y-4">
        {logs.map((log: any) => (
             <Card key={log.id} className="overflow-hidden">
                <div className="flex items-center p-4 gap-4">
                    <div className="bg-muted p-2 rounded-full">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant={log.type === 'ERROR' ? 'destructive' : log.type === 'WARNING' ? 'secondary' : 'outline'}>
                                {log.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono">
                                {new Date(log.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm font-medium">{log.message}</p>
                    </div>
                </div>
             </Card>
        ))}
      </div>
    </div>
  );
}
