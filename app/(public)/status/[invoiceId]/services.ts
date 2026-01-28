// services/transactionService.ts
import axiosClient from "@/lib/axiosInstance";

// ==================== TYPE DEFINITIONS ====================
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";

export interface Transaction {
  id: number;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  sku: string;
  customerNo: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  packetStatus: string | null;
}

interface GetStatusTransactionResponse {
  statusCode: number;
  message: string;
  data: {
    transaction: Transaction;
  };
}

// ==================== SERVICE / API FUNCTION ====================
export const getStatusTransaction = async (
  invoiceId: string,
): Promise<Transaction> => {
  const response = await axiosClient.get<GetStatusTransactionResponse>(
    `/transaction/status/${invoiceId}`,
  );

  return response.data.data.transaction;
};
