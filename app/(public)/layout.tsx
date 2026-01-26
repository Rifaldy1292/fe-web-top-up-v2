import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
