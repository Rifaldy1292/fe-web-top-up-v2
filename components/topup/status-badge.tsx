import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransactionStatus } from "@/stores/useTopupStore";
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";

interface StatusBadgeProps {
  status: String;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyle = () => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200";
      case "PAID":
      case "PROCESSING":
        return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200";
      case "FAILED":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-200";
      default:
        return "bg-muted text-muted-foreground border-transparent";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "INIT":
        return "Menunggu Pembayaran";
      case "PAID":
        return "Pembayaran Diterima";
      case "PROCESSING":
        return "Sedang Diproses";
      case "SUCCESS":
        return "Berhasil";
      case "FAILED":
        return "Gagal";
      default:
        return status;
    }
  };

  const getIcon = () => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      case "FAILED":
        return <XCircle className="w-3.5 h-3.5 mr-1" />;
      case "PAID":
      case "PROCESSING":
        return <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />;
      case "INIT":
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant="outline" className={cn("px-3 py-1 font-semibold", getStyle(), className)}>
      {getIcon()}
      {getLabel()}
    </Badge>
  );
}
