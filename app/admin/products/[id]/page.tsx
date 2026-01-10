
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/useAdminStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { products, providers, updateProduct } = useAdminStore();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
        setFormData(found);
    } else {
        router.push("/admin/products");
    }
  }, [id, products, router]);

  if (!formData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(formData.id, formData);
    toast.success("Product updated successfully");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-2">
                    <Label>Product Name</Label>
                    <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                
                <div className="grid gap-2">
                    <Label>Slug</Label>
                    <Input 
                        value={formData.slug} 
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Category</Label>
                     <Select 
                        value={formData.category} 
                        onValueChange={(val) => setFormData({...formData, category: val})}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="games">Games</SelectItem>
                            <SelectItem value="pulsa">Pulsa</SelectItem>
                            <SelectItem value="voucher">Voucher</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label>Provider</Label>
                    <Select 
                        value={formData.provider} 
                        onValueChange={(val) => setFormData({...formData, provider: val})}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MANUAL">Manual (No API)</SelectItem>
                            {providers.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
