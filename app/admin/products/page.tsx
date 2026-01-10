
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
import { Edit, Plus } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  const router = useRouter();
  const { isAuthenticated, products, toggleProductStatus } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button>
            <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-muted">
                                    <Image src={product.image} fill alt="" className="object-cover" />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">
                                <div>{product.name}</div>
                                <div className="text-xs text-muted-foreground">{product.developer}</div>
                            </TableCell>
                            <TableCell className="capitalize">{product.category}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="text-xs">{product.provider || 'MANUAL'}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Switch 
                                        checked={product.status === 'ACTIVE'} 
                                        onCheckedChange={() => toggleProductStatus(product.id)}
                                    />
                                    <span className="text-xs text-muted-foreground">{product.status}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline" onClick={() => router.push(`/admin/products/${product.id}`)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
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
