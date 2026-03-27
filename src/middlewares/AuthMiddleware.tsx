import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useAppSelector } from "../redux/hooks";

type Props = {
  children: React.ReactNode;
};

export function AuthMiddleware({ children }: Props) {
  const { AuthStatus } = useAppSelector((state) => state.auth);

  if (AuthStatus === "authenticated") {
    return children;
  }
  if (AuthStatus === "not_verified") {
    return <Loading />;
  }

  return <Navigate to="/signin" />;
}
