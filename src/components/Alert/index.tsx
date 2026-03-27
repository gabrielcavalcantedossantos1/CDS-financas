import { useEffect } from "react";
import { Container, Content, Title } from "./styles";
import { MdDoneAll, MdInfoOutline } from "react-icons/md";

type Props = {
  type: string;
  show: boolean;
  setShow: (value: boolean) => void;
  autoHideDuration?: number;
  title?: string;
  children?: React.ReactNode;
};

export function Alert({
  type,
  setShow,
  show,
  children,
  title,
  autoHideDuration = 6000,
}: Props) {
  useEffect(() => {
    if (show && autoHideDuration) {
      const timeoutId = window.setTimeout(() => {
        setShow(false);
      }, autoHideDuration);

      // Evita atualizar estado após desmontar/navegar
      return () => window.clearTimeout(timeoutId);
    }
    return;
  }, [show, autoHideDuration, setShow]);

  return (
    <Container $show={show} $type={type}>
      {type === "error" && <MdInfoOutline className="icon" />}
      {type === "success" && <MdDoneAll className="icon" />}

      <Content>{title && <Title>{title}</Title>}</Content>

      {children}
    </Container>
  );
}
