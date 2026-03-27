import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { getDashboard } from "../../services/requests";
import {
  Body,
  BodyRow,
  Container,
  Header,
  HeaderFilter,
  HeaderInfo,
  HeaderSubTitle,
  HeaderTitle,
  InformationCard,
  InformationCardContent,
  InformationCardContentLabel,
  InformationCardContentValue,
  Loading,
  NewTransactionCard,
  NewTransactionCardLabel,
} from "./styles";
import { SelectInput } from "../../components/SelectInput";
import { ScaleLoader } from "react-spinners";
import { FcBullish, FcCancel, FcOk } from "react-icons/fc";
import { formatValue } from "../../utils/formatValue";
import { Button } from "../../components/Button";
import { MdAdd } from "react-icons/md";

export function Home() {
  const [LoadingRequest, setLoadingRequest] = useState(true);
  const [monthSelected, setMonthSelected] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );
  const [yearSelected, setYearSelected] = useState(
    new Date().getFullYear().toString(),
  );
  const [dateDashboard, setDateDashboard] = useState({
    balance: 0,
    pending_transactions: 0,
    completed_transactions: 0,
  });

  const theme = useTheme();

  function handleMonthSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonthSelected(e.target.value);
  }

  function handleYearSelected(e: React.ChangeEvent<HTMLSelectElement>) {
    setYearSelected(e.target.value);
  }

  function getYears() {
    const years = [];
    for (let i = 2026; i <= new Date().getFullYear(); i++) {
      years.push({ label: i.toString(), value: i.toString() });
    }

    return years;
  }

  function getMonths() {
    const monthsArray = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(new Date().getFullYear(), index, 1);
      return {
        value: (index + 1).toString().padStart(2, "0"),
        label: date.toLocaleString("pt-BR", { month: "long" }),
      };
    });

    return monthsArray;
  }

  async function handleGetDashboard() {
    setLoadingRequest(true);
    const responde = await getDashboard(monthSelected, yearSelected);
    setLoadingRequest(false);
    setDateDashboard(responde);
  }

  useEffect(() => {
    handleGetDashboard();
  }, [monthSelected, yearSelected]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Meu saldo</HeaderTitle>
          <HeaderSubTitle>
            Acompanhe seu saldo e filtre por mês e ano com facilidade
          </HeaderSubTitle>

          <HeaderFilter>
            <SelectInput
              value={monthSelected}
              options={getMonths()}
              onChange={handleMonthSelected}
            />

            <SelectInput
              value={yearSelected}
              options={getYears()}
              onChange={handleYearSelected}
            />
          </HeaderFilter>
        </HeaderInfo>
      </Header>

      {LoadingRequest && (
        <Loading>
          <ScaleLoader color={theme.COLORS.primary} />
        </Loading>
      )}

      {!LoadingRequest && (
        <Body>
          <BodyRow>
            <InformationCard>
              <FcBullish size={32} />

              <InformationCardContent>
                <InformationCardContentValue
                  style={{
                    color:
                      dateDashboard.balance >= 0
                        ? theme.COLORS.success
                        : theme.COLORS.danger,
                  }}
                >
                  {formatValue(dateDashboard.balance)}
                </InformationCardContentValue>

                <InformationCardContentLabel>
                  Saldo total atual do mês!
                </InformationCardContentLabel>
              </InformationCardContent>
            </InformationCard>

            <InformationCard>
              <FcCancel size={32} />

              <InformationCardContent>
                <InformationCardContentValue
                  style={{
                    color:
                      dateDashboard.balance >= 0
                        ? theme.COLORS.success
                        : theme.COLORS.danger,
                  }}
                >
                  {dateDashboard.pending_transactions}
                </InformationCardContentValue>

                <InformationCardContentLabel>
                  Transações pendentes!
                </InformationCardContentLabel>
              </InformationCardContent>
            </InformationCard>

            <InformationCard>
              <FcOk size={32} />

              <InformationCardContent>
                <InformationCardContentValue
                  style={{
                    color:
                      dateDashboard.balance >= 0
                        ? theme.COLORS.success
                        : theme.COLORS.danger,
                  }}
                >
                  {dateDashboard.completed_transactions}
                </InformationCardContentValue>

                <InformationCardContentLabel>
                  Transações concluidas!
                </InformationCardContentLabel>
              </InformationCardContent>
            </InformationCard>
          </BodyRow>

          <BodyRow style={{ marginTop: 30 }}>
            <NewTransactionCard to="/transacoes/nova">
              <Button borderRadius="rounded">
                <MdAdd size={21} />
              </Button>

              <NewTransactionCardLabel>
                Criar nova transação
              </NewTransactionCardLabel>
            </NewTransactionCard>
          </BodyRow>
        </Body>
      )}
    </Container>
  );
}
