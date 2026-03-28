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

  const transactions = response.data?.transactions ?? [];
  transactions.forEach((transaction) => {
    const date = formatDate(transaction.created_at).split("/");

    if (date[1] === mounth && date[2] === year) {
      balance += transaction.amount;
      if (transaction.status === "pending") pending_transactions += 1;
      else if (transaction.status === "completed") completed_transactions += 1;
    }
  });

  return {
    balance,
    pending_transactions,
    completed_transactions,
  };
};
