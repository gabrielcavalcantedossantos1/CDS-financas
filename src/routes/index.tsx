import { Route, Routes } from "react-router-dom";
import { Auth } from "../pages/Auth";
import { Layout } from "../components/Layout/indez";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Auth type="signIn" />} />
      <Route path="/signup" element={<Auth type="signUp" />} />
      <Route element={<Layout />}>
        <Route index element={<div>Esse é a página inicial</div>} />
      </Route>
    </Routes>
  );
};
