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

/** GET dashboard: o Xano devolve um array de transações direto no corpo da resposta. */
export type ApiGetDashboard = TransactionDashboard[];

export type ApiNewTransaction = {
  transaction: Transaction;
};

export type ApiUpdateTransaction = {
  transaction: Transaction;
};

export type ApiDeleteTransaction = {
  success: boolean;
};
