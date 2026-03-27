type ApiErrorPayload = {
  code?: string;
  message?: string;
  payload?: {
    param?: string;
  };
};

export function getErrorMessage(error: ApiErrorPayload): string {
  const code = error?.code;
  const message = error?.message?.toLowerCase() ?? "";
  const param = error?.payload?.param;

  if (!code) {
    return "Erro inesperado, tente novamente.";
  }

  switch (code) {
    case "ERROR_CODE_NOT_FOUND":
      return "Não foi possível localizar a requisição.";

    case "ERROR_CODE_EMAIL_ALREADY_EXISTS":
      return "Este e-mail já está em uso.";

    case "ERROR_CODE_INVALID_PASSWORD":
    case "ERROR_CODE_ACCESS_DENIED":
      return "E-mail ou senha inválidos.";

    case "ERROR_CODE_PASSWORD_TOO_WEAK":
      return "A senha é muito fraca.";

    case "ERROR_CODE_INVALID_EMAIL":
      return "E-mail inválido.";

    case "ERROR_CODE_UNAUTHORIZED":
      return "Sua sessão expirou. Faça login novamente.";

    case "ERROR_CODE_INPUT_ERROR":
      if (param === "password" && message.includes("minimum length")) {
        return "A senha deve ter pelo menos 8 caracteres.";
      }
      if (param === "password" && message.includes("weak password")) {
        return "A senha precisa conter ao menos uma letra.";
      }
      if (param === "email") {
        return "Informe um e-mail válido.";
      }
      return "Dados inválidos. Verifique os campos e tente novamente.";

    default:
      return "Erro inesperado, tente novamente.";
  }
}