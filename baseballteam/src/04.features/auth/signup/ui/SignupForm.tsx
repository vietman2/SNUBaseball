import styled from "styled-components";

import { useSignupForm } from "../contexts/useSignupForm";
import { TextButton } from "@shared/ui/Buttons";
import { TextInput } from "@shared/ui/Inputs";
import { useColors } from "@shared/lib/styles";

export function SignupForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    submit,
    goBack,
  } = useSignupForm();
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
      <TextInput
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        password
      />
      <Buttons>
        <TextButton text="뒤로" onClick={goBack} backgroundColor={colors.background900} />
        <TextButton text="회원가입" onClick={submit} />
      </Buttons>
    </>
  );
}

const Buttons = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;

  > button {
    display: flex;
    flex: 1;
  }
`;
