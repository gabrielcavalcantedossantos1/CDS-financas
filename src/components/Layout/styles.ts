import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

export const Content = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 70px;
  }
`;

export const NavbarContent = styled.div`
  height: 70px;
  background-color: ${(props) => props.theme.COLORS.navbarBackground};
  border-bottom: 1px solid ${(props) => props.theme.COLORS.borderColor};
`;

export const BodyContent = styled.div`
  height: calc(100vh -70px);
  background-color: ${(props) => props.theme.COLORS.background};
  overflow: auto;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 70px);
    overflow: visible;
  }
`;
