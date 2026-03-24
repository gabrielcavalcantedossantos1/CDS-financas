import { useEffect } from "react";
import { useAuth } from "./hooks/auth";

export default function App() {
  const { handleAuthenticateUser } = useAuth();

  useEffect(() => {
    // chamando a funcao para autenticar o user ao carregar a pagina e salvando no localStorage
    handleAuthenticateUser();
  }, []);

  return <div>...</div>;
}
