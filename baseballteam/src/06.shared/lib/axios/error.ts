import { isAxiosError } from "axios";

export function serverErrorMessageParser(
  error: unknown,
  fallbackMessage: string
) {
  if (isAxiosError(error) && error.response?.data.message) {
    return {
      status: error.response.data.status,
      message: error.response.data.message,
    };
  }

  return {
    status: "ERROR",
    message: fallbackMessage,
  };
}
