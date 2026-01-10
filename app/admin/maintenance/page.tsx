
"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function MaintenancePage() {
  const router = useRouter();
  const { isAuthenticated, isMaintenanceMode, toggleMaintenance, maintenanceMessage, setMaintenanceMessage } = useAdminStore();
  const [msg, setMsg] = useState(maintenanceMessage);

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    setMaintenanceMessage(msg);
    toast.success("Maintenance settings updated");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight">Maintenance Control</h2>

      <Card className={isMaintenanceMode ? "border-red-500 bg-red-50" : ""}>
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>Global Maintenance Mode</span>
                <Switch 
                    checked={isMaintenanceMode}
                    onCheckedChange={toggleMaintenance}
                />
            </CardTitle>
            <CardDescription>
                When enabled, the public site will show a maintenance page (simulated).
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             {isMaintenanceMode && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        The application is currently in maintenance mode.
                    </AlertDescription>
                </Alert>
             )}
             
             <div className="space-y-2">
                <label className="text-sm font-medium">Maintenance Message</label>
                <div className="flex gap-2">
                    <Input 
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Enter maintenance message..."
                    />
                    <Button onClick={handleSave}>Save</Button>
                </div>
             </div>
        </CardContent>
      </Card>
    </div>
  );
}
