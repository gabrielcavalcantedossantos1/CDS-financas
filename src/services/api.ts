import axios, { AxiosError } from "axios";

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
    instance.defaults.headers.common["Authorization"] = localStorage.getItem(
      import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY,
    );
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

    // Tentamos pegar a mensagem de vários lugares comuns em APIs
    const serverMessage =
      e.response?.data?.message || // Padrão mais comum
      e.response?.data?.error || // Algumas APIs usam .error
      e.response?.data?.errors?.[0]?.message || // APIs que retornam lista de erros (ex: Yup/Zod)
      e.message || // Mensagem genérica do Axios
      "Erro inesperado no servidor";

    return {
      data: null, // Importante garantir que data seja null no erro
      error: serverMessage,
    };
  }
};
