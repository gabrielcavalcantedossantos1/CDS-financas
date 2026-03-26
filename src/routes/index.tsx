import { Route, Routes } from "react-router-dom";
import { Auth } from "../pages/Auth";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Auth type="signIn" />} />
      <Route path="/signup" element={<Auth type="signUp" />} />
    </Routes>
  );
};
