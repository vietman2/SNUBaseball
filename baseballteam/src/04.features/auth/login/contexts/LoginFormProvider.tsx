import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { type LoginFormContextType, LoginFormContext } from "./useLoginForm";
import { useLogin, useAuth } from "@shared/lib/auth";

export function LoginFormProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: loginRequest } = useLogin();

  const submit = useCallback(async () => {
    loginRequest(
      {
        username,
        password,
      },
      {
        onSuccess: (res) => {
          login(res.user, res.access);
          navigate("/home");
        },
        onError: () => {
          window.alert("로그인에 실패했습니다.");
        },
      }
    );
  }, [username, password, login, navigate, loginRequest]);

  const navigateToSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submit();
      }
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [username, password, submit]);

  const value = useMemo<LoginFormContextType>(
    () => ({
      username,
      setUsername,
      password,
      setPassword,
      submit,
      navigateToSignup,
    }),
    [username, password, submit, navigateToSignup]
  );

  return (
    <LoginFormContext.Provider value={value}>
      {children}
    </LoginFormContext.Provider>
  );
}
