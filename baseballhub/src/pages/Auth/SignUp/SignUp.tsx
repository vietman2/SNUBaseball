import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/images/logo.png";
import { TextButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";

export function SignUp() {
  const [student_id, setStudentId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  }

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
          <TextButton text="뒤로" onClick={handleGoBack} />
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
  background-color: ${({ theme }) => theme.colors.background};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.lavender};
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
