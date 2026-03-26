import { ScaleLoader } from "react-spinners";
import { Container, Label } from "./styles";
import { useTheme } from "styled-components";

export function Loading() {
  const theme = useTheme();

  return (
    <Container>
      <ScaleLoader color={theme.COLORS.primary} />
      <Label>Por favor, aguarde...</Label>
    </Container>
  );
}
