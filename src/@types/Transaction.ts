export type TransactionStatus = "pending" | "completed";

export type Transaction = {
  id: number;
  title: string;
  status: TransactionStatus;
  amount: number;
  created_at: number;
  user_id: number;
};

export type TransactionDashboard = Pick<
  Transaction,
  "amount" | "created_at" | "status"
>;

export type ApiGetTransactions = {
  transactions: {
    itemsReceived: number;
    curPage: number;
    nextPage?: string;
    prevPage?: string;
    offset: number;
    itemsTotal: number;
    pageTotal: number;
    items: Transaction[];
  };
};

export type ApiGetTransaction = {
  transaction: Transaction;
};

export type ApiGetDashboard = {
  transactions: TransactionDashboard[];
  /** Opcional: o backend pode enviar totais globais; o front prefere calcular por mês/ano a partir de `transactions`. */
  pending_transactions?: number;
  completed_transactions?: number;
};

export type ApiNewTransaction = {
  transaction: Transaction;
};

export type ApiUpdateTransaction = {
  transaction: Transaction;
};

export type ApiDeleteTransaction = {
  success: boolean;
};
