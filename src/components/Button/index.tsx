import { ButtonElement } from "./styles";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md";
  borderRadius?: "rounded" | "sm" | "md";
  width?: string;
};

export function Button({
  children,
  onClick,
  size = "sm",
  borderRadius = "sm",
  width = "100%",
}: Props) {
  return (
    <ButtonElement
      onClick={onClick}
      $size={size}
      $borderRadius={borderRadius}
      $width={width}
    >
      {children}
    </ButtonElement>
  );
}
