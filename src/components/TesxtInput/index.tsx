import { useId } from "react";
import { Container, Input, Label } from "./styles";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  borderRadius?: "sm" | "md";
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
};

export function TextInput({
  value,
  onChange,
  label,
  placeholder,
  borderRadius,
  type = "text",
  autoComplete,
}: Props) {
  const referenceId = useId();

  return (
    <Container>
      {label && <Label htmlFor={referenceId}>{label}</Label>}

      <Input
        id={referenceId}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $borderRadius={borderRadius}
      />
    </Container>
  );
}
