import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    background-color: ${(props) => props.theme.COLORS.background};
    color: ${(props) => props.theme.COLORS.textColor500};
  }
`;

