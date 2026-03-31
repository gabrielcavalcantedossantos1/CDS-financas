import { useEffect, useState } from "react";
import type { Transaction } from "../../../@types/Transaction";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteTransaction, getTransactions } from "../../../services/requests";
import {
  Body,
  Container,
  Empty,
  EmptyIcon,
  Header,
  HeaderInfo,
  HeaderSearch,
  HeaderSearchICon,
  HeaderSearchInput,
  HeaderSubTitle,
  HeaderTitle,
  Label,
  Loading,
  Pagination,
  PaginationItem,
} from "./styles";
import { TextInput } from "../../../components/TesxtInput";
import { Button } from "../../../components/Button";
import { Alert } from "../../../components/Alert";
import { ScaleLoader } from "react-spinners";
import { TransactionsTable } from "../../../components/TransactionsTable";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export function Transactions() {
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showAlert, setShowAlert] = useState({
    type: "error",
    message: "",
    show: false,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsFiltered, setTransactionsFiltered] = useState<
    Transaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const theme = useTheme();
  const navigate = useNavigate();

  async function handleGetTransactions() {
    setLoadingRequest(true);

    try {
      const request = await getTransactions(currentPage);

      if (request?.data && Array.isArray(request.data)) {
        setTransactions(request.data);
        setTransactionsFiltered(request.data);
        setTotalPages(1);
      } else {
        console.error("Formato inesperado da API:", request.data);
      }

      if (request?.error) {
        setShowAlert({
          type: "error",
          message: request.error,
          show: true,
        });
      }
    } catch (error) {
      setShowAlert({
        type: "error",
        message: "Erro ao buscar transações",
        show: true,
      });
    } finally {
      setLoadingRequest(false);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleSearch() {
    setTransactionsFiltered(
      transactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }

  function handleEditTransaction(id: number) {
    navigate(`/transacoes/${id}/editar`);
  }

  async function handleDeleteTransaction(id: number) {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      setLoadingRequest(true);
      await deleteTransaction(id);
      await handleGetTransactions();
      setLoadingRequest(false);

      setShowAlert({
        type: "success",
        message: "Transação excluída com sucesso!",
        show: true,
      });
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, [currentPage]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Transações</HeaderTitle>
          <HeaderSubTitle>
            Consulte e gerencie todas as suas transações e filtre sua busca por
            títulos!
          </HeaderSubTitle>
        </HeaderInfo>

        <HeaderSearch>
          <HeaderSearchInput>
            <TextInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Pesquisar"
            />
          </HeaderSearchInput>

          <Button onClick={handleSearch} borderRadius="rounded">
            <HeaderSearchICon />
          </Button>
        </HeaderSearch>
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
        <Body>
          {transactionsFiltered.length === 0 ? (
            <Empty>
              <EmptyIcon />
              <Label>Nenhuma transação encontrada</Label>
            </Empty>
          ) : (
            <>
              <TransactionsTable
                data={transactionsFiltered}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
              <Pagination>
                <PaginationItem
                  $isLeft
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <MdOutlineKeyboardArrowLeft size={21} />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem
                    key={index}
                    $active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationItem>
                ))}

                <PaginationItem
                  $isRight
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <MdOutlineKeyboardArrowRight size={21} />
                </PaginationItem>
              </Pagination>
            </>
          )}
        </Body>
      )}
    </Container>
  );
}
