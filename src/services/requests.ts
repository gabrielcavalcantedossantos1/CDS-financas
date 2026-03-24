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
    endpoint: "auth/signin",
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
  let pending_transactions = response.data?.pending_transactions ?? 0;
  let completed_transactions = response.data?.completed_transactions ?? 0;

  if (response.data) {
    response.data.transactions.map((transaction) => {
      const date = formatDate(transaction.created_at).split("/"); // sem split: 24/03/2026 ---- com split: [24, 03, 2026]

      if (date[1] === mounth && date[2] === year) balance += transaction.amount;
    });
  }

  return {
    balance,
    pending_transactions,
    completed_transactions,
  };
};
