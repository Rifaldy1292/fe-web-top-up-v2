"use client";

type GlobalLoadingProps = {
  isVisible: boolean;
};

export default function GlobalLoading({ isVisible }: GlobalLoadingProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  );
}
