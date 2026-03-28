import type {
  ApiDeleteUser,
  ApiGetUser,
  ApiSignIn,
  ApiSignUp,
  ApiupdateUser,
} from "../@types/Auth";
import type {
  ApiGetTransactions,
  ApiGetTransaction,
  TransactionStatus,
  ApiUpdateTransaction,
  ApiGetDashboard,
} from "../@types/Transaction";
import { formatDate } from "../utils/formatDate";
import { api } from "./api";

// Auth
export const signUp = async (name: string, email: string, password: string) => {
  return await api<ApiSignUp>({
    endpoint: "auth/signup",
    method: "POST",
    data: {
      name,
      email,
      password,
    },
    withAuth: false,
  });
};

export const signIn = async (email: string, password: string) => {
  return await api<ApiSignIn>({
    endpoint: "auth/login",
    method: "POST",
    data: {
      email,
      password,
    },
    withAuth: false,
  });
};

// User
export const getUser = async () => {
  return await api<ApiGetUser>({
    endpoint: "auth/me",
  });
};

export const updateUser = async (name: string, email: string) => {
  return await api<ApiupdateUser>({
    endpoint: "users",
    method: "PUT",
    data: {
      name,
      email,
    },
  });
};

export const deleteUser = async () => {
  return await api<ApiDeleteUser>({
    endpoint: "users",
    method: "DELETE",
  });
};

// Transactions
export const getTransactions = async (page: number) => {
  return await api<ApiGetTransactions>({
    endpoint: "transactions",
    data: { page },
  });
};

export const getTransaction = async (id: number) => {
  return await api<ApiGetTransaction>({
    endpoint: `transactions/${id}`,
  });
};

export const newTransaction = async (
  title: string,
  amount: number,
  status?: TransactionStatus,
) => {
  return await api<ApiGetTransaction>({
    endpoint: "transactions",
    method: "POST",
    data: {
      title,
      amount,
      status,
    },
  });
};

export const updateTransaction = async (
  id: number,
  title: string,
  amount: number,
  status: TransactionStatus,
) => {
  return await api<ApiUpdateTransaction>({
    endpoint: `transactions/${id}`,
    method: "PUT",
    data: {
      title,
      amount,
      status,
    },
  });
};

export const deleteTransaction = async (id: number) => {
  return await api<ApiGetTransaction>({
    endpoint: `transactions/${id}`,
    method: "DELETE",
  });
};

// Dashboard
export const getDashboard = async (mounth: string, year: string) => {
  const response = await api<ApiGetDashboard>({
    endpoint: "dashboard",
  });

  let balance = 0;
  let pending_transactions = 0;
  let completed_transactions = 0;

  const raw = response.data;
  const transactions: ApiGetDashboard = Array.isArray(raw) ? raw : [];

  transactions.forEach((transaction) => {
    // Pegamos a data e formatamos para comparar com o filtro do Dashboard
    const fullDate = formatDate(transaction.created_at);
    const dateParts = fullDate.split("/");

    const itemMonth = dateParts[1]; // Ex: "03"
    const itemYear = dateParts[2];  // Ex: "2026"

    if (itemMonth === mounth && itemYear === year) {
      // Soma o valor ao saldo total
      balance += Number(transaction.amount) || 0;
      
      // Contabiliza por status conforme o que você preencheu no Xano
      if (transaction.status === "pending") {
        pending_transactions += 1;
      } else if (transaction.status === "completed") {
        completed_transactions += 1;
      }
    }
  });

  return {
    balance,
    pending_transactions,
    completed_transactions,
  };
};