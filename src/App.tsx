import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { useTheme } from "./hooks/theme";

export default function App() {
  const { handleAuthenticateUser } = useAuth();
  const { handleInitTheme } = useTheme();

  useEffect(() => {
    // chamando a funcao para autenticar o user ao carregar a pagina e salvando no localStorage
    handleAuthenticateUser();

    // aplicar o tema salvo pelo usuario
    handleInitTheme();
  }, []);

  return <div>...</div>;
}
