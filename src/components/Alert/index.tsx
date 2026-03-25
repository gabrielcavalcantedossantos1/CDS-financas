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
      setTimeout(() => {
        (setShow(false), autoHideDuration);
      });
    }
  }, [show]);

  return (
    <Container $show={show} $type={type}>
      {type === "error" && <MdInfoOutline className="icon" />}
      {type === "success" && <MdDoneAll className="icon" />}

      <Content>{title && <Title>{title}</Title>}</Content>

      {children}
    </Container>
  );
}
