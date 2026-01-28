import { create } from "zustand";
import { PRODUCTS, PAYMENT_METHODS } from "@/lib/mock-data";

export type TransactionStatus = "INIT" | "PAID" | "PROCESSING" | "SUCCESS" | "FAILED";

interface TopupState {
  // UI State
  isLoading: boolean;
  setLoading: (value: boolean) => void;

  // Selection State
  selectedListPacket: {
    id: number;
    gameId: number;
    name: string;
    price: number;
    product_digiflazz_id: string | null;
  };
  selectedProductSlug: string | null;
  selectedNominalId: string | null;
  selectedPaymentId: string | null;
  userId: string;
  phoneNumber: string; // for contacting regular users

  // Transaction State
  invoiceId: string | null;
  transactionStatus: TransactionStatus;

  // Actions
  setListPacket: (packet: any) => void;

  setProduct: (slug: string) => void;
  setNominal: (id: string) => void;
  setPayment: (id: string) => void;
  setUserId: (id: string) => void;
  setPhoneNumber: (num: string) => void;
  createTransaction: () => string; // Returns invoice ID
  checkTransaction: (invoiceId: string) => void;
  reset: () => void;
}

export const useTopupStore = create<TopupState>((set, get) => ({
  // UI
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),

  selectedProductSlug: null,
  selectedNominalId: null,

  selectedPaymentId: null,
  selectedListPacket: { id: 0, gameId: 0, name: "", price: 0, product_digiflazz_id: "" },
  userId: "",
  phoneNumber: "",
  invoiceId: null,
  transactionStatus: "INIT",

  setProduct: (slug) => set({ selectedProductSlug: slug }),
  setListPacket: (packet) => set({ selectedListPacket: packet }),

  setNominal: (id) => set({ selectedNominalId: id }),
  setPayment: (id) => set({ selectedPaymentId: id }),
  setUserId: (id) => set({ userId: id }),
  setPhoneNumber: (num) => set({ phoneNumber: num }),

  createTransaction: () => {
    const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    set({ invoiceId, transactionStatus: "INIT" });

    // Simulate payment process
    setTimeout(() => {
      set({ transactionStatus: "PAID" });
      setTimeout(() => {
        set({ transactionStatus: "PROCESSING" });
        setTimeout(() => {
          set({ transactionStatus: "SUCCESS" });
        }, 3000);
      }, 2000);
    }, 5000); // Simulate waiting for payment

    return invoiceId;
  },

  checkTransaction: (invoiceId) => {
    // In a real app, this would fetch from API
    // Here we just simulate a found transaction
    if (invoiceId) {
      set({ transactionStatus: "SUCCESS", invoiceId });
    }
  },

  reset: () =>
    set({
      isLoading: false,
      selectedProductSlug: null,
      selectedNominalId: null,
      selectedPaymentId: null,
      selectedListPacket: { id: 0, gameId: 0, name: "", price: 0, product_digiflazz_id: "" },
      userId: "",
      invoiceId: null,
      transactionStatus: "INIT",
    }),
}));
