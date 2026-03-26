import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${(prop) => prop.theme.FONT_SIZES.sm};
  color: ${(prop) => prop.theme.COLORS.textColor400};
  margin-left: 3px;
`;

export const Select = styled.select`
  width: 100%;
  background-color: ${(prop) => prop.theme.COLORS.inputBackground};
  color: ${(prop) => prop.theme.COLORS.inputPlaceholderColor};
  border: 1px solid ${(prop) => prop.theme.COLORS.inputBorderColor};
  outline: none;
  padding: 10px 13px;
  box-sizing: border-box;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: ${(prop) => prop.theme.COLORS.inputBackgroundHover};
  }

  &:focus {
    border-color: ${(prop) => prop.theme.COLORS.inputBorderColor};
  }
`;
