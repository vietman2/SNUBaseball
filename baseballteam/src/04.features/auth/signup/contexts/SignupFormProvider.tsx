import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { type SignupFormContextType, SignupFormContext } from "./useSignupForm";
import { useSignup, useStudentIdCheck } from "@shared/lib/auth";

export function SignupFormProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [memberId, setMemberId] = useState<number>(-1);
  const [studentId, setStudentId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { mutate: checkRequest } = useStudentIdCheck();
  const { mutate: signupRequest } = useSignup();

  const checkId = useCallback(async () => {
    checkRequest(
      { student_id: studentId },
      {
        onSuccess: (res) => {
          setMemberId(res.member_id);
          window.alert(`${res.name} 학번 확인되었습니다.`);
        },
      }
    );
  }, [studentId, checkRequest]);

  const submit = useCallback(async () => {
    if (memberId === -1) {
      window.alert("학번을 먼저 확인해주세요.");
      return;
    }

    setLoading(true);

    signupRequest(
      {
        member: memberId,
        student_id: studentId,
        username,
        password,
        password2: passwordConfirm,
      },
      {
        onSuccess: () => {
          window.alert("회원가입에 성공했습니다. 로그인 해주세요.");
          navigate("/login");
        },
      }
    );
  }, [
    memberId,
    studentId,
    username,
    password,
    passwordConfirm,
    signupRequest,
    navigate,
  ]);

  const goBack = useCallback(() => {
    navigate(-1);
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
  }, [submit]);

  const value = useMemo<SignupFormContextType>(
    () => ({
      memberId,
      studentId,
      setStudentId,
      username,
      setUsername,
      password,
      setPassword,
      passwordConfirm,
      setPasswordConfirm,
      isLoading: loading,
      checkId,
      submit,
      goBack,
    }),
    [
      memberId,
      studentId,
      username,
      password,
      passwordConfirm,
      loading,
      submit,
      checkId,
      goBack,
    ]
  );

  return (
    <SignupFormContext.Provider value={value}>
      {children}
    </SignupFormContext.Provider>
  );
}
