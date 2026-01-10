
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

export function PhoneInput({ value, onChange, label = "User ID", placeholder = "Masukkan User ID / Zone ID" }: PhoneInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone-input" className="text-base font-semibold">{label}</Label>
      <div className="relative">
        <Input
          id="phone-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 text-lg bg-muted/30 border-input/50 focus:border-primary"
        />
        {/* Helper text or icon could go here */}
      </div>
      <p className="text-xs text-muted-foreground">
        Pastikan ID yang anda masukkan sudah benar.
      </p>
    </div>
  );
}
