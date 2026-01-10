
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login
    setTimeout(() => {
        if (email === "admin" && password === "admin") {
            login();
            router.push("/dashboard");
            toast.success("Welcome back, Admin!");
        } else {
            toast.error("Invalid credentials (try admin/admin)");
            setIsLoading(false);
        }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Enter your credentials to access dashboard</p>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Username</Label>
                    <Input 
                        id="email" 
                        placeholder="admin" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
