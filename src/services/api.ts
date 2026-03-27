import axios, { AxiosError } from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";

type Props = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  withAuth?: boolean;
};

export const api = async <TypeResponse>({
  endpoint,
  method = "GET",
  data,
  withAuth = true,
}: Props) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  if (withAuth) {
    const token = localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY);
    if (token) {
      instance.defaults.headers.common["Authorization"] = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
  }

  try {
    const request = await instance<TypeResponse>(endpoint, {
      method,
      params: method == "GET" && data,
      data: method != "GET" && data,
    });

    return {
      data: request.data,
    };
  } catch (error) {
    const e = error as AxiosError<any>; // Usamos 'any' aqui para mapear qualquer estrutura de erro

    const responseData = e.response?.data;
    const translatedMessage =
      responseData && typeof responseData === "object"
        ? getErrorMessage(responseData)
        : null;
    const fallbackMessage = getErrorMessage({});
    const finalMessage = translatedMessage || e.message || fallbackMessage;

    return {
      data: null, // Importante garantir que data seja null no erro
      error: finalMessage,
    };
  }
};
