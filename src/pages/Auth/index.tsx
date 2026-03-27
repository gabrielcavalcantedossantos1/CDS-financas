import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubTitle,
  CardTitle,
  Container,
  Link,
  Wrapper,
} from "./styles";
import { Alert } from "../../components/Alert";
import { TextInput } from "../../components/TesxtInput";
import { Button } from "../../components/Button";

type Props = {
  type: "signIn" | "signUp";
};

export function Auth({ type }: Props) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const { handleSignIn, handleSignUp } = useAuth();
  const navigate = useNavigate();

  async function handleOnClick() {
    // 1. Resetar o alerta para começar do zero
    setShowAlert({ type: "error", message: "", show: false });

    const [name, email, password] = [nameInput, emailInput, passwordInput];

    // 2. Mantemos APENAS a validação de campos vazios (para não enviar lixo para a API)
    if ((type === "signUp" && !name) || !email || !password) {
      setShowAlert({
        type: "error",
        message: "Preencha todos os campos para continuar.",
        show: true,
      });
      return;
    }

    // 3. Chamada direta para a API
    // Agora não checamos mais letras, números ou tamanho aqui.
    // O que o usuário digitar, nós enviamos.
    const request = await (type === "signIn"
      ? handleSignIn(email, password)
      : handleSignUp(name, email, password));

    // 4. Se a API retornar true, deu certo!
    if (request === true) {
      navigate("/");
    } else {
      // 5. Se der erro, mostramos EXATAMENTE o que a API respondeu
      // (Ex: "E-mail já cadastrado", "Senha muito curta", etc.)
      setShowAlert({
        type: "error",
        message: String(request),
        show: true,
      });
    }
  }

  // Limpa os campos quando o usuário troca entre Login e Cadastro
  useEffect(() => {
    setNameInput("");
    setEmailInput("");
    setPasswordInput("");
    setShowAlert({ type: "error", message: "", show: false });
  }, [type]);

  return (
    <Wrapper>
      <Container>
        <Alert
          type={showAlert.type}
          show={showAlert.show}
          setShow={(show) => setShowAlert({ ...showAlert, show })}
          title={showAlert.message}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              {type === "signIn" ? "Entre na sua conta!" : "Criar uma conta!"}
            </CardTitle>
            <CardSubTitle>
              Insira as informações necessárias para{" "}
              {type === "signIn" ? "entrar" : "criar uma conta"}
            </CardSubTitle>
          </CardHeader>

          <CardBody>
            {type === "signUp" && (
              <TextInput
                value={nameInput}
                placeholder="Digite seu nome"
                onChange={(e) => setNameInput(e.target.value)}
                borderRadius="sm"
              />
            )}

            <TextInput
              value={emailInput}
              placeholder="Digite seu email"
              onChange={(e) => setEmailInput(e.target.value)}
              borderRadius="sm"
            />

            <TextInput
              value={passwordInput}
              placeholder="Digite sua senha"
              onChange={(e) => setPasswordInput(e.target.value)}
              borderRadius="sm"
            />
          </CardBody>

          <CardFooter>
            <Button onClick={handleOnClick} size="md">
              {type === "signIn" ? "Entrar" : "Registrar-se"}
            </Button>

            {type === "signIn" ? (
              <Link to="/signup">Não possui uma conta? Registre-se</Link>
            ) : (
              <Link to="/signin">Já possui uma conta? Entre</Link>
            )}
          </CardFooter>
        </Card>
      </Container>
    </Wrapper>
  );
}
