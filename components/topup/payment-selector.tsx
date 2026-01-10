
import { cn } from '@/lib/utils';
import { PAYMENT_METHODS } from '@/lib/mock-data';

interface PaymentSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentSelector({ selectedId, onSelect }: PaymentSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Pilih Pembayaran</h3>
      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
           const isSelected = selectedId === method.id;
           return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={cn(
                "cursor-pointer flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:border-primary/50",
                 isSelected 
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-input bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Icon Placeholder */}
                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {method.icon.toUpperCase()}
                </div>
                <div>
                    <div className="font-semibold text-sm">{method.name}</div>
                    <div className="text-xs text-muted-foreground">Proses: Otomatis</div>
                </div>
              </div>
              <div className="text-right">
                 {method.fee > 0 ? (
                     <div className="text-xs text-red-500 font-medium">+ Rp {method.fee.toLocaleString('id-ID')}</div>
                 ) : (
                     <div className="text-xs text-green-600 font-medium">Bebas Biaya</div>
                 )}
              </div>
            </div>
           ); 
        })}
      </div>
    </div>
  );
}
