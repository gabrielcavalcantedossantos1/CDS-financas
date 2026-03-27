import { useState } from "react";
import { useTheme } from "../../../hooks/theme";
import { useAuth } from "../../../hooks/auth";
import { Container, Icon, LeftSide, RightSide } from "./styles";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

export function Navbar() {
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

  const { handleToggleTheme, theme } = useTheme();
  const { handleSignOut } = useAuth();

  async function handleTogggleFullScreen() {
    let enable = true;

    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
      enable = false;
    }

    setFullScreenEnabled(enable);
  }

  return (
    <Container>
      <LeftSide>
        <Icon onClick={handleTogggleFullScreen}>
          {fullScreenEnabled ? <BiExitFullscreen /> : <BiFullscreen />}
        </Icon>
      </LeftSide>

      <RightSide>
        <Icon onClick={handleToggleTheme}>
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </Icon>

        <Icon onClick={handleSignOut}>
          <TbLogout />
        </Icon>
      </RightSide>
    </Container>
  );
}
