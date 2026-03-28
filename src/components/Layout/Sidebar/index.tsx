import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useLocation } from "react-router-dom";

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
  Link,
} from "./styles";
import { Button } from "../../Button";
import {
  MdOutlineAddTask,
  MdOutlineDashboard,
  MdOutlineListAlt,
} from "react-icons/md";

import Logo from "../../../../public/img/logo.png";

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

  const initials = (name?: string | null) => {
    const cleaned = (name ?? "").trim();
    if (!cleaned) return "";

    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  function handleToggleExpand() {
    setIsEspanded(!isEspanded);
  }

  return (
    <Container $expanded={isEspanded}>
      <Header>
        {isEspanded && (
          <Link to="/">
            <HeaderLogo src={Logo} alt="Logo Image" />
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
            <UserAvatar>{initials(auth.user?.name) || "--"}</UserAvatar>
            <UserName>{auth.user?.name || "Usuário"}</UserName>
          </User>
        </Link>
      </Footer>
    </Container>
  );
};
