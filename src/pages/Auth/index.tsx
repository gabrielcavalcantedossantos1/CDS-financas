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
    const [name, email, password] = [nameInput, emailInput, passwordInput];

    if ((type === "signUp" && !name) || !email || !password) {
      setShowAlert({
        type: "error",
        message: "Preencha todos os campos",
        show: true,
      });
      return;
    }

    const request = await (type === "signIn"
      ? handleSignIn(email, password)
      : handleSignUp(name, email, password));

    if (request != true) {
      setShowAlert({
        type: "error",
        message: request,
        show: true,
      });
    }

    // redirecionar o usuario ja altenticado
    navigate("/");
  }

  useEffect(() => {
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
            {type == "signUp" && (
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
              value={nameInput}
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
              <Link to="/signin">Ja possui uma conta? Entre</Link>
            )}
          </CardFooter>
        </Card>
      </Container>
    </Wrapper>
  );
}
