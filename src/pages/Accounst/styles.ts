import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 50px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.borderColor};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 20px 16px;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const HeaderTitle = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZES.xl};
  color: ${(props) => props.theme.COLORS.textColor500};
  font-weight: 800;
`;

export const HeaderSubTitle = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
  color: ${(props) => props.theme.COLORS.textColor400};
`;

export const HeaderDeleteAccount = styled.div``;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 50px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 16px;
  }
`;

export const Footer = styled.div`
  padding: 5px 50px;

  @media (max-width: 768px) {
    padding: 10px 16px;
    button {
      width: 100%;
    }
  }
`;
