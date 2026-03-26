import { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import { useTheme } from "./hooks/theme";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";
import { MainRoutes } from "./routes";

export default function App() {
  const { handleAuthenticateUser } = useAuth();
  const { handleInitTheme, theme } = useTheme();

  useEffect(() => {
    // chamando a funcao para autenticar o user ao carregar a pagina e salvando no localStorage
    handleAuthenticateUser();

    // aplicar o tema salvo pelo usuario
    handleInitTheme();
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <MainRoutes />
    </ThemeProvider>
  );
}
