import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Body,
  Container,
  Footer,
  Header,
  HeaderDeleteAccount,
  HeaderInfo,
  HeaderSubTitle,
  HeaderTitle,
  Loading,
} from "./styles";
import { Alert } from "../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";
import { deleteUser, updateUser } from "../../services/requests";
import { setUser } from "../../redux/slice/authSlice";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TesxtInput";

export function Accounts() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [nameValue, setNameValue] = useState(user?.name as string);
  const [emailValue, setEmailValue] = useState(user?.email as string);
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const { handleSignOut } = useAuth();
  const theme = useTheme();

  // Atualiza dados do usuário
  async function handleUpdateAccount() {
    setLoadingRequest(true);
    try {
      const request = await updateUser(nameValue, emailValue);

      if (request.error) {
        setShowAlert({ type: "error", message: request.error, show: true });
      } else if (request.data) {
        dispatch(setUser(request.data.user));
        setShowAlert({
          type: "success",
          message: "Conta atualizada com sucesso!",
          show: true,
        });
      }
    } catch (error: any) {
      setShowAlert({
        type: "error",
        message: error.message || "Erro ao atualizar conta",
        show: true,
      });
    } finally {
      setLoadingRequest(false);
    }
  }

  // Deleta a conta do usuário
  async function handleDeleteAccount() {
    if (
      window.confirm(
        "Tem certeza que deseja excluir sua conta? Essa ação é irreversível!",
      )
    ) {
      setLoadingRequest(true);
      try {
        await deleteUser();
        handleSignOut();
      } catch (error: any) {
        setShowAlert({
          type: "error",
          message: error.message || "Erro ao deletar a conta",
          show: true,
        });
      } finally {
        setLoadingRequest(false);
      }
    }
  }

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Minha Conta</HeaderTitle>

          <HeaderSubTitle>
            Edite os dados da sua conta ou exclua-a permanentemente. Tenha
            cuidado, essa ação é irreversível!
          </HeaderSubTitle>
        </HeaderInfo>

        <HeaderDeleteAccount>
          <Button onClick={handleDeleteAccount} width="120px" size="md">
            Excluir conta
          </Button>
        </HeaderDeleteAccount>
      </Header>

      <Alert
        type={showAlert.type}
        title={showAlert.message}
        show={showAlert.show}
        setShow={(show) => setShowAlert({ ...showAlert, show })}
      />

      {loadingRequest && (
        <Loading>
          <ScaleLoader color={theme.COLORS.primary} />
        </Loading>
      )}

      {!loadingRequest && (
        <>
          <Body>
            <TextInput
              label="Seu nome"
              placeholder="Ex:João da Silva"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              borderRadius="sm"
            />

            <TextInput
              label="Seu email"
              placeholder="Ex: 1W2p5@example.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              borderRadius="sm"
            />
          </Body>

          <Footer>
            <Button onClick={handleUpdateAccount} width="110px" size="md">
              Salvar
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
}
