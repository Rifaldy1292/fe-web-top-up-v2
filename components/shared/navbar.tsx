
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          TOPUP<span className="text-primary">Z</span>
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
            <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
            </Button>
        </div>
      </div>
    </nav>
  );
}
