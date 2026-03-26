import styled from "styled-components";

type InputProps = {
  $borderRadius?: "sm" | "md";
};

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

export const Input = styled.input<InputProps>`
  width: 100%;
  background-color: ${(prop) => prop.theme.COLORS.inputBackground};
  color: ${(prop) => prop.theme.COLORS.inputColor};
  border: 1px solid ${(prop) => prop.theme.COLORS.inputBorderColor};
  outline: none;
  padding: 11px 20px;
  box-sizing: border-box;
  transition: all 0.3s;
  border-radius: ${(props) => (props.$borderRadius == "sm" ? "4px" : "40px")};

  &::placeholder {
    color: ${(prop) => prop.theme.COLORS.inputPlaceholderColor};
  }

  &:hover {
    background-color: ${(prop) => prop.theme.COLORS.inputBackgroundHover};
  }

  &:focus {
    border-color: ${(prop) => prop.theme.COLORS.inputBorderColorFocus};
  }
`;
