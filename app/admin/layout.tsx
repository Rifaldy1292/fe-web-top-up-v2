

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingBag, Receipt, Users, LogOut, Settings, Server, CreditCard, Activity } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If login page, don't show sidebar
  if (pathname === '/admin/login') {
      return <div className="min-h-screen flex items-center justify-center bg-muted/20">{children}</div>;
  }

  const menu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', href: '/admin/transactions', icon: Receipt },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Providers', href: '/admin/providers', icon: Server },
    { name: 'Payment Methods', href: '/admin/payment-methods', icon: CreditCard },
    { name: 'Logs', href: '/admin/logs', icon: Activity },
    { name: 'Maintenance', href: '/admin/maintenance', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r fixed inset-y-0 left-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
            <h1 className="font-bold text-xl">TOPUP<span className="text-primary">Z</span> Admin</h1>
        </div>
        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menu.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link 
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive 
                                ? "bg-primary/10 text-primary hover:bg-primary/20" 
                                : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                    </Link>
                );
            })}
        </div>
        <div className="p-4 border-t">
             <Link 
                href="/admin/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
