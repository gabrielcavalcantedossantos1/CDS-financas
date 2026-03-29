type TransactionProps = {
  amount: number;
  createdAt: string;
  id: number;
  status: TransactionStatus;
  title: string;
};

import { useEffect, useState } from "react";
import type {
  Transaction,
  TransactionStatus,
} from "../../../@types/Transaction";
import { useTheme } from "styled-components";
import { getTransaction, updateTransaction } from "../../../services/requests";
import {
  Body,
  Container,
  Footer,
  Header,
  HeaderInfo,
  HeaderSubTitle,
  HeaderTitle,
  Loading,
} from "./styles";
import { Alert } from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { TextInput } from "../../../components/TesxtInput";
import { SelectInput } from "../../../components/SelectInput";
import { Button } from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { formatValue } from "../../../utils/formatValue";

export function EditNewTransaction() {
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [titleValue, setTitleValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [stateValue, setStateValue] = useState<TransactionStatus>("pending");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 FUNÇÃO PARA ATUALIZAR
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

    const amountNumber = Number(amount.replace(/\./g, "").replace(",", "."));
    setLoadingRequest(true);

    try {
      const request = await updateTransaction(
        Number(id),
        title,
        amountNumber,
        state,
      );

      if (request.error) {
        setShowAlert({ type: "error", message: request.error, show: true });
      } else {
        setShowAlert({
          type: "success",
          message: "Transação editada com sucesso",
          show: true,
        });
      }
    } finally {
      setLoadingRequest(false);
    }
  }

  // 🔥 FUNÇÃO PARA BUSCAR A TRANSAÇÃO
  async function handleGetTransaction() {
    setLoadingRequest(true);
    try {
      const request = await getTransaction(Number(id));

      // Força a tipagem para Transaction
      const transaction = request.data as unknown as Transaction;

      if (!transaction || request.error) {
        navigate("/transacoes/nova");
        return;
      }

      setTitleValue(transaction.title);
      setAmountValue(formatValue(transaction.amount));
      setStateValue(transaction.status);
    } finally {
      setLoadingRequest(false);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate("/transacoes/nova");
      return;
    }
    handleGetTransaction();
  }, [id, navigate]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Editar transação</HeaderTitle>
          <HeaderSubTitle>
            Edite a transação, preencha todos os campos abaixo e clique em
            salvar.
          </HeaderSubTitle>
        </HeaderInfo>
      </Header>

      <Alert
        type={showAlert.type}
        show={showAlert.show}
        setShow={(show) => setShowAlert({ ...showAlert, show })}
        title={showAlert.message}
      />

      {loadingRequest ? (
        <Loading>
          <ScaleLoader color={theme.COLORS.primary} />
        </Loading>
      ) : (
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
              placeholder="Ex: 1.000,00"
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
