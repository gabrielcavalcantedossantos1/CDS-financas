import type { User } from "../@types/Auth";
import { useAppDispatch } from "../redux/hooks";
import { setAuthStatus, setAuthToken, setUser } from "../redux/slice/authSlice";
import { getUser, signIn, signUp } from "../services/requests";

const LOCAL_STORAGE_AUTH_KEY = import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY;

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // funçao para autenticar o user
  const authenticate = (user: User, authToken: string) => {
    dispatch(setUser(user));
    dispatch(setAuthToken(authToken));
    dispatch(setAuthStatus("authenticated"));

    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, authToken);
  };

  // pegando o token para o localStorage
  const handleGetToken = () => localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  // pegando o usuario que esta la no localStorage
  const handleAuthenticateUser = async () => {
    dispatch(setAuthStatus("not_verified"));
    const authToken = handleGetToken();

    if (!authToken) {
      dispatch(setAuthStatus("not_authenticated"));
      return;
    }

    const request = await getUser();

    if (!request.data) {
      dispatch(setAuthStatus("not_authenticated"));
      return;
    }

    const { data } = request;
    authenticate(data.user, authToken);
  };

  // funçao para logar
  // função para logar
  const handleSignIn = async (email: string, password: string) => {
    const request = await signIn(email, password);

    if (request.data) {
      const { data } = request;
      authenticate(data.user, data.authToken);
      return true;
    }

    dispatch(setAuthStatus("not_authenticated"));

    // AQUI: Se request.error não existir, enviamos uma frase padrão
    return request.error || "E-mail ou senha incorretos.";
  };

  // função para registrar
  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const request = await signUp(name, email, password);

    if (request.data) {
      const { data } = request;
      authenticate(data.user, data.authToken);
      return true;
    }

    dispatch(setAuthStatus("not_authenticated"));

    // AQUI: Se request.error não existir, enviamos uma frase padrão
    return request.error || "Erro ao criar conta. Verifique os dados.";
  };

  // funçao para deslogar
  const handleSignOut = () => {
    dispatch(setUser(null));
    dispatch(setAuthToken(null));
    dispatch(setAuthStatus("not_authenticated"));

    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  };

  return {
    handleGetToken,
    handleAuthenticateUser,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };
};
