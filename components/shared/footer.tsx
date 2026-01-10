
export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10 bg-muted/20">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-2">TOPUPZ</h3>
                <p className="text-sm text-muted-foreground">
                    Platform top up game termurah, tercepat, dan terpercaya.
                </p>
            </div>
            <div>
                 <h4 className="font-semibold mb-2">Dukungan</h4>
                 <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>WhatsApp</li>
                    <li>Email</li>
                    <li>Telegram</li>
                 </ul>
            </div>
             <div>
                 <h4 className="font-semibold mb-2">Legal</h4>
                 <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>Syarat & Ketentuan</li>
                    <li>Kebijakan Privasi</li>
                 </ul>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TopUpZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
