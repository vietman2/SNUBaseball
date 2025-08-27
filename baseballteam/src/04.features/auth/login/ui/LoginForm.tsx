import styled from "styled-components";

import { useLoginForm } from "../contexts/useLoginForm";
import { useColors } from "@shared/lib/styles";
import { TextButton } from "@shared/ui/Buttons";
import { TextInput } from "@shared/ui/Inputs";

export function LoginForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    submit,
    navigateToSignup,
  } = useLoginForm();
  const { colors } = useColors();

  return (
    <>
      <TextInput placeholder="아이디" value={username} onChange={setUsername} />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChange={setPassword}
        password
      />
      <Buttons>
        <TextButton text="로그인" onClick={submit} />
        <TextButton
          text="회원가입"
          onClick={navigateToSignup}
          backgroundColor={colors.background900}
        />
      </Buttons>
    </>
  );
}

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;

  > button {
    display: flex;
    flex: 1;
  }
`;
