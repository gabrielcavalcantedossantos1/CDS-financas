import { useId, type ChangeEvent } from "react";
import { Container, Label, Select } from "./styles";

type Options = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  options: Options[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
};

export function SelectInput({ onChange, options, value, label }: Props) {
  const referenceId = useId();

  return (
    <Container>
      {label && <Label htmlFor={referenceId}>{label}</Label>}

      <Select id={referenceId} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
}
