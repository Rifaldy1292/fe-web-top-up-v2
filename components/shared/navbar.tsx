"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import Image from "next/image";
import { useTopupStore } from "@/stores/useTopupStore";
import GlobalLoading from "./globalLoading";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoading = useTopupStore((state) => state.isLoading);

  return (
    <>
      {" "}
      <GlobalLoading isVisible={isLoading} />
      <nav className="border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Image src="/icon.png" alt="TOPUPZ Logo" width={28} height={28} priority />
            <span>
              RIPEDI<span className="text-primary">A</span>
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/check-transaction" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cek Transaksi
            </Link>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari game..."
                className="h-9 w-64 rounded-full border border-input bg-muted/50 px-9 text-sm outline-none focus:ring-1 focus:ring-ring transition-all"
              />
            </div>
          </div>
          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {isOpen ? (
              <div className="flex items-center gap-2">
                <Input type="search" placeholder="Search..." autoFocus className="w-48" />

                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close search">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open search">
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-name">Name</Label>
                    <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sheet-demo-username">Username</Label>
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                  </div>
                </div>
                {/* <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
