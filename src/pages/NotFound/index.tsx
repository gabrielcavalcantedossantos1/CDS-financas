import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container, Icon } from "./styles";

export const NotFound = () => {
    
    const navigate = useNavigate();

    function handleOnclick() {
      navigate("/");
    }
    
    return (
    <Container>
      <Icon />

      <Button onClick={handleOnclick} size="md" width="150px">
        Voltar para a página inicial
      </Button>
    </Container>
  );
};
