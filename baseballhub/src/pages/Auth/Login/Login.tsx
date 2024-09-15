import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";
import Logo from "@assets/images/logo.png";
import { TextButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";
import { palette } from "@colors/palette";
import { tempProfile } from "@data/user/people";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    // TODO: Implement login logic
    login(tempProfile);
    navigate("/home");
  };

  return (
    <Container>
      <Box>
        <LogoImage src={Logo} alt="Logo" />
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
        <Buttons>
          <TextButton text="로그인" onClick={handleLogin} />
          <TextButton text="회원가입" onClick={handleSignUp} />
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
  border-radius: 10px;
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
