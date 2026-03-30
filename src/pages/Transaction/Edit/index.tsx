import { useEffect, useState } from "react";
import type { Transaction, TransactionStatus } from "../../../@types/Transaction";
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

/** Converte string BRL para número, aceitando negativo */
function parseBRL(value: string) {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(",", "."));
}

/** Formata valor BRL enquanto digita */
function formatBRLInput(value: string) {
  if (!value) return "";

  // Remove tudo que não seja número
  let numeric = value.replace(/[^0-9\-]/g, "");

  // Detecta negativo
  let isNegative = false;
  if (numeric.startsWith("-")) {
    isNegative = true;
    numeric = numeric.substring(1);
  }

  if (!numeric) return isNegative ? "-" : "";

  // Converte para centavos (2 últimos dígitos)
  let number = parseInt(numeric, 10);
  let cents = number % 100;
  let reais = Math.floor(number / 100);

  // Formata reais com separador de milhares
  let reaisFormatted = reais.toLocaleString("pt-BR");

  let formatted = `${reaisFormatted},${cents.toString().padStart(2, "0")}`;
  if (isNegative) formatted = `-${formatted}`;

  return formatted;
}

export function EditNewTransaction() {
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [titleValue, setTitleValue] = useState("");
  const [amountValue, setAmountValue] = useState(""); // input text
  const [stateValue, setStateValue] = useState<TransactionStatus>("pending");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });

  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  /** Atualiza a transação */
  async function handleOnclick() {
    if (!titleValue || !amountValue || !stateValue) {
      setShowAlert({
        type: "error",
        message: "Preencha todos os campos para continuar",
        show: true,
      });
      return;
    }

    const amountNumber = parseBRL(amountValue);
    setLoadingRequest(true);

    try {
      const request = await updateTransaction(Number(id), titleValue, amountNumber, stateValue);

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

  /** Busca a transação pelo ID */
  async function handleGetTransaction() {
    setLoadingRequest(true);
    try {
      const request = await getTransaction(Number(id));
      const transaction = request.data as unknown as Transaction;

      if (!transaction || request.error) {
        navigate("/transacoes/nova");
        return;
      }

      setTitleValue(transaction.title);
      setAmountValue(formatBRLInput(transaction.amount.toString())); // já formatado
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
            Edite a transação, preencha todos os campos abaixo e clique em salvar.
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
              placeholder="Ex: 1.000,50"
              value={amountValue}
              onChange={(e) => {
                // Formata enquanto digita
                const numericValue = e.target.value.replace(/[^0-9\-]/g, "");
                setAmountValue(formatBRLInput(numericValue));
              }}
              borderRadius="sm"
              type="text"
            />

            <SelectInput
              label="Status"
              options={[
                { label: "Pendente", value: "pending" },
                { label: "Concluído", value: "completed" },
              ]}
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value as TransactionStatus)}
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