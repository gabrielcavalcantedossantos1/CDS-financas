import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 40px 60px 40px 50px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.borderColor};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
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

export const HeaderFilter = styled.div`
  display: flex;
  gap: 14px;
  flex-shrink: 0;
  width: 320px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Body = styled.div`
  flex: 1;
  padding: 40px 50px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    overflow-x: hidden;
  }
`;

export const BodyRow = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 100vw;
  }
`;

export const InformationCard = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.COLORS.borderColor};
  padding: 35px 30px;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 12px;
  }
`;

export const InformationCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InformationCardContentValue = styled.span`
  color: ${(props) => props.theme.COLORS.textColor500};
  font-weight: 700;
  font-size: ${(props) => props.theme.FONT_SIZES.lg};
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.FONT_SIZES.md};
  }
`;

export const InformationCardContentLabel = styled.span`
  color: ${(props) => props.theme.COLORS.textColor400};
  font-weight: 600;
  font-size: ${(props) => props.theme.FONT_SIZES.md};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.FONT_SIZES.sm};
  }
`;

export const NewTransactionCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-decoration: none;
  gap: 25px;
  border: 1px solid ${(props) => props.theme.COLORS.borderColor};
  padding: 30px;
  background-color: ${(props) =>
    props.theme.COLORS.primaryBackgroundExtraLight};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 18px;
  }

  &:hover {
    background-color: ${(props) => props.theme.COLORS.primary};
  }
`;

export const NewTransactionCardLabel = styled.span`
  color: ${(props) => props.theme.COLORS.primary};
  font-size: ${(props) => props.theme.FONT_SIZES.lg};
  font-weight: 800;
`;
