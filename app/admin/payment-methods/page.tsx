
"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus } from "lucide-react";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const { isAuthenticated, paymentMethods, togglePaymentStatus, addPaymentMethod } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [newMethod, setNewMethod] = useState({ name: "", fee: "", icon: "" });

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const filteredMethods = paymentMethods.filter((method) => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "ALL" || method.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddMethod = () => {
    if (!newMethod.name || !newMethod.fee) return;
    addPaymentMethod({
        name: newMethod.name,
        fee: parseInt(newMethod.fee),
        icon: newMethod.icon || "💳"
    });
    setNewMethod({ name: "", fee: "", icon: "" });
    setIsAddMethodOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Payment Methods</h2>
        <Dialog open={isAddMethodOpen} onOpenChange={setIsAddMethodOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Method
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input 
                            id="name" 
                            value={newMethod.name}
                            onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fee" className="text-right">Fee</Label>
                        <Input 
                            id="fee" 
                            type="number"
                            value={newMethod.fee}
                            onChange={(e) => setNewMethod({ ...newMethod, fee: e.target.value })}
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">Icon</Label>
                        <Input 
                            id="icon" 
                            placeholder="Emoji or text"
                            value={newMethod.icon}
                            onChange={(e) => setNewMethod({ ...newMethod, icon: e.target.value })}
                            className="col-span-3" 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddMethod}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search payment methods..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
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
                        {filteredMethods.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No payment methods found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredMethods.map((method) => (
                                <TableRow key={method.id}>
                                    <TableCell className="font-mono text-xl">{method.icon}</TableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
