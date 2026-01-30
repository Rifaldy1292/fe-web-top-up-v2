
import { create } from 'zustand';
import { signIn, signUp, logOut } from '@/lib/auth';
import { MOCK_TRANSACTIONS, PRODUCTS, PROVIDERS, PAYMENT_METHODS, SYSTEM_LOGS } from '@/lib/mock-data';

interface AdminState {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  
  // Data State
  transactions: any[];
  products: any[];
  providers: any[];
  paymentMethods: any[];
  logs: any[];
  isMaintenanceMode: boolean;
  maintenanceMessage: string;

  // Auth Actions
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  
  // Data Actions
  updateTransactionStatus: (invoiceId: string, status: string) => void;
  toggleProductStatus: (id: string) => void;
  updateProduct: (id: string, data: any) => void;
  toggleProviderStatus: (id: string) => void;
  updateProvider: (id: string, data: any) => void;
  togglePaymentStatus: (id: string) => void;
  addPaymentMethod: (data: any) => void;
  toggleMaintenance: () => void;
  setMaintenanceMessage: (msg: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: false,
  user: null,

  transactions: MOCK_TRANSACTIONS,
  products: PRODUCTS,
  providers: PROVIDERS,
  paymentMethods: PAYMENT_METHODS,
  logs: SYSTEM_LOGS,
  isMaintenanceMode: false,
  maintenanceMessage: "System is currently under maintenance. Please check back later.",

  login: async (data) => {
    try {
      await signIn(data);
      set({ isAuthenticated: true, user: { name: data.email || 'Admin', role: 'Admin' } });
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    try {
      await signUp(data);
      set({ isAuthenticated: true, user: { name: data.email || 'Admin', role: 'Admin' } });
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    await logOut();
    set({ isAuthenticated: false, user: null });
  },

  updateTransactionStatus: (invoiceId, status) => {
    set(state => ({
        transactions: state.transactions.map(t => 
            t.invoiceId === invoiceId ? { ...t, status } : t
        )
    }));
  },

  toggleProductStatus: (id) => {
    set(state => ({
        products: state.products.map(p => 
            p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : p
        )
    }));
  },

  updateProduct: (id, data) => {
    set(state => ({
        products: state.products.map(p => 
            p.id === id ? { ...p, ...data } : p
        )
    }));
  },

  toggleProviderStatus: (id) => {
    set(state => ({
        providers: state.providers.map(p => 
            p.id === id ? { ...p, status: p.status === 'ONLINE' ? 'MAINTENANCE' : 'ONLINE' } : p
        )
    }));
  },

  updateProvider: (id, data) => {
    // e.g. updating API key
    set(state => ({
        providers: state.providers.map(p => 
            p.id === id ? { ...p, ...data } : p
        )
    }));
  },
  
  togglePaymentStatus: (id) => {
    set(state => ({
        paymentMethods: state.paymentMethods.map(p => 
            p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'MAINTENANCE' : 'ACTIVE' } : p
        )
    }));
  },

  addPaymentMethod: (data) => {
    set(state => ({
        paymentMethods: [
            ...state.paymentMethods,
            {
                id: `PM-${state.paymentMethods.length + 1}`,
                status: 'ACTIVE',
                ...data
            }
        ]
    }));
  },

  toggleMaintenance: () => set(state => ({ isMaintenanceMode: !state.isMaintenanceMode })),
  
  setMaintenanceMessage: (msg) => set({ maintenanceMessage: msg }),
}));
