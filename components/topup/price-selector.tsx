import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PriceSelectorProps {
  nominals: { id: string; name: string; price: number }[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  selectListPacket: any;
}

export function PriceSelector({ nominals, selectedId, onSelect, selectListPacket }: PriceSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {nominals?.map((nominal) => {
        const isSelected = selectedId === nominal.id;
        selectListPacket;
        return (
          <div
            key={nominal.id}
            onClick={() => {
              selectListPacket(nominal);
              onSelect(nominal.id);
            }}
            className={cn(
              "cursor-pointer relative p-4 rounded-xl border-2 transition-all duration-200 hover:border-primary/50",
              isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-transparent bg-muted/50 text-muted-foreground",
            )}
          >
            <div className="font-bold text-sm md:text-base text-foreground">{nominal.name}</div>
            <div className="text-xs md:text-sm mt-1">Rp {nominal.price.toLocaleString("id-ID")}</div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
