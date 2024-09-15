import { useState } from "react";
import styled from "styled-components";

import Logo from "@assets/images/logo.png";
import { TextButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";
import { palette } from "@colors/palette";

export function SignUp() {
  const [student_id, setStudentId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  return (
    <Container>
      <Box>
        <LogoImage src={Logo} alt="Logo" />
        <TextInput
          placeholder="학번"
          value={student_id}
          onChange={setStudentId}
        />
        <TextInput
          placeholder="아이디"
          value={username}
          onChange={setUsername}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChange={setPassword}
        />
        <TextInput
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <Buttons>
          <TextButton text="회원가입" onClick={() => {}} />
        </Buttons>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid ${palette.grayBorder};
  gap: 15px;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
