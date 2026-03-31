import { Route, Routes } from "react-router-dom";
import { Auth } from "../pages/Auth";
import { Layout } from "../components/Layout/indez";
import { Home } from "../pages/Home";
import { NewTransaction } from "../pages/Transaction/New";
import { EditNewTransaction } from "../pages/Transaction/Edit";
import { Transactions } from "../pages/Transaction/Transactions";
import { Accounts } from "../pages/Accounst";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Auth type="signIn" />} />
      <Route path="/signup" element={<Auth type="signUp" />} />

      <Route element={<Layout />}>
        <Route path="account" element={<Accounts />} />
        <Route index element={<Home />} />
        <Route path="/transacoes">
          <Route index element={<Transactions />} />
          <Route path="nova" element={<NewTransaction />} />
          <Route path=":id/editar" element={<EditNewTransaction />} />
        </Route>
      </Route>
    </Routes>
  );
};
