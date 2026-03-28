import { useState } from "react";
import type { TransactionStatus } from "../../../@types/Transaction";
import { useTheme } from "styled-components";
import { newTransaction } from "../../../services/requests";
import {
  Body,
  Container,
  Footer,
  Header,
  HeaderInfo,
  HeaderSubTitle,
  HeaderTitle,
} from "./styles";
import { Alert } from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { TextInput } from "../../../components/TesxtInput";
import { SelectInput } from "../../../components/SelectInput";
import { Button } from "../../../components/Button";

export function NewTransaction() {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [stateValue, setStateValue] = useState<TransactionStatus>("pending");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const theme = useTheme();

  async function handleOnclick() {
    const [title, amount, state] = [titleValue, amountValue, stateValue];

    if (!title || !amount || !state) {
      setShowAlert({
        type: "error",
        message: "Preencha todos os campos para continuar",
        show: true,
      });
      return;
    }

    const amountUSD = Number(amount.replace(/\./g, "").replace(",", "."));

    setLoadingRequest(true);
    const request = await newTransaction(title, amountUSD, state);
    setLoadingRequest(false);

    if (request.error) {
      setShowAlert({
        type: "error",
        message: request.error,
        show: true,
      });
    } else {
      setShowAlert({
        type: "success",
        message: "Transação criada com sucesso",
        show: true,
      });

      setTitleValue("");
      setAmountValue("");
      setStateValue("pending");
    }
  }

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Nova transação</HeaderTitle>
          <HeaderSubTitle>
            Crie uma nova transação, preencha todos os campos abaixo e clique em
            salvar.
          </HeaderSubTitle>
        </HeaderInfo>
      </Header>

      <Alert
        type={showAlert.type}
        show={showAlert.show}
        setShow={(show) => setShowAlert({ ...showAlert, show })}
      />

      {loadingRequest && <ScaleLoader color={theme.COLORS.primary} />}

      {!loadingRequest && (
        <>
          <Body>
            <TextInput
              label="Título da transação"
              placeholder="Ex: Salário"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              borderRadius="sm"
            />

            <TextInput
              label="Valor"
              placeholder="Ex: R$1.000,00 ou -R$1.000,00"
              value={amountValue}
              onChange={(e) => setAmountValue(e.target.value)}
              borderRadius="sm"
            />

            <SelectInput
              label="Status"
              options={[
                { label: "Pendente", value: "pending" },
                { label: "Concluído", value: "completed" },
              ]}
              value={stateValue}
              onChange={(e) =>
                setStateValue(e.target.value as TransactionStatus)
              }
            />
          </Body>

          <Footer>
            <Button onClick={handleOnclick} size="md" width="110px">
              Salvar
            </Button>
          </Footer>
        </>
      )}
    </Container>
  );
}
