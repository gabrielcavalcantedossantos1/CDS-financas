import { MdSearch } from "react-icons/md";
import { TbTableOff } from "react-icons/tb";
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
  flex-wrap: wrap;
  gap: 16px;
  padding: 40px 50px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.borderColor};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
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

export const HeaderSearch = styled.div`
  display: flex;
  gap: 15px;
  min-width: 320px;
  width: 100%;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
    flex-direction: row;
    gap: 10px;
  }
`;

export const HeaderSearchInput = styled.div`
  flex: 1;
  width: 100%;
`;

export const HeaderSearchICon = styled(MdSearch)`
  font-size: ${(props) => props.theme.FONT_SIZES.md};
`;

export const Body = styled.div`
  padding: 30px 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Empty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.textColor400};
`;

export const Label = styled.span`
  font-size: ${(props) => props.theme.FONT_SIZES.sm};
  font-weight: 700;
`;

export const EmptyIcon = styled(TbTableOff)`
  font-size: ${(props) => props.theme.FONT_SIZES.xxl};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 10px 15px;
  border-radius: 10px;
  background: ${(props) => props.theme.COLORS.background};
`;

export const PaginationItem = styled.button<{
  $active?: boolean;
  $isRight?: boolean;
  $isLeft?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  min-width: 42px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${(props) =>
    props.$active ? props.theme.COLORS.primary : "transparent"};
  color: ${(props) =>
    props.$active
      ? props.theme.COLORS.buttonColor
      : props.theme.COLORS.textColor400};
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.COLORS.primary
        : props.theme.COLORS.borderColor};
  border-radius: ${(props) =>
    props.$isLeft ? "8px 0 0 8px" : props.$isRight ? "0 8px 8px 0" : "8px"};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.primary};
    color: #fff;
    border-color: ${(props) => props.theme.COLORS.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
