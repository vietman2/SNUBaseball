export type APIErrorType = {
  message: string;
  status: "ERROR" | "NOT_FOUND" | "UNAUTHORIZED";
};

export type APIResponseType<T> = {
  data: T;
  status: "SUCCESS";
};
