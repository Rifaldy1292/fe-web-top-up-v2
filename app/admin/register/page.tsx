"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAdminStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Mock Registration
    setTimeout(() => {
      register(formData.name);
      toast.success(`Welcome, ${formData.name}! Registration successful.`);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-none">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">
          Create Admin Account
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your details to create a new admin account
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
