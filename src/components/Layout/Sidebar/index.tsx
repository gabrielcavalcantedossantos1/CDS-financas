import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Link, Navigate, useLocation } from "react-router-dom";

//import styles
import {
  Container,
  Header,
  HeaderICon,
  HeaderLogo,
  Navigation,
  NavigateItem,
  NavigateItemIcon,
  NavigateItemLabel,
  Footer,
  User,
  UserAvatar,
  UserName,
} from "./styles";
import { Button } from "../../Button";
import {
  MdOutlineAddTask,
  MdOutlineDashboard,
  MdOutlineListAlt,
} from "react-icons/md";

const menuItems = [
  { label: "Dashboard", url: "/", icon: <MdOutlineDashboard /> },
  {
    label: "Nova Transação",
    url: "/transacoes/nova",
    icon: <MdOutlineAddTask />,
  },
  { label: "Transações", url: "/transacoes", icon: <MdOutlineListAlt /> },
];

export const Sidebar = () => {
  const [isEspanded, setIsEspanded] = useState(true);

  const auth = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  function handleToggleExpand() {
    setIsEspanded(!isEspanded);
  }

  return (
    <Container $expanded={isEspanded}>
      <Header>
        {isEspanded && (
          <Link to="/">
            <HeaderLogo src="/logo.png" alt="Logo Image" />
          </Link>
        )}

        <Button onClick={handleToggleExpand} borderRadius="rounded">
          <HeaderICon />
        </Button>
      </Header>

      <Navigation>
        {menuItems.map((item) => (
          <Link to={item.url} key={item.url}>
            <NavigateItem $active={pathname === item.url}>
              <NavigateItemIcon>{item.icon}</NavigateItemIcon>
              <NavigateItemLabel>{item.label}</NavigateItemLabel>
            </NavigateItem>
          </Link>
        ))}
      </Navigation>

      <Footer>
        <Link to="/account">
          <User $isActive={pathname === "/account"}>
            <UserAvatar>{auth.user?.name?.slice(0, 2)}</UserAvatar>
            <UserName>{auth.user?.name}</UserName>
          </User>
        </Link>
      </Footer>
    </Container>
  );
};
