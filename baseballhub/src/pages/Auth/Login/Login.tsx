import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/images/logo.png";
import { TextButton } from "@components/Buttons";
import { Loading } from "@components/Fallbacks";
import { TextInput } from "@components/Inputs";
import { useAuth } from "@contexts/auth";
import { getProfile, login as loginRequest, refresh } from "@services/auth";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { login, setToken } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    const response = await loginRequest(username, password);

    if (!response) {
      alert("로그인에 실패했습니다.");
      return;
    } else {
      const userProfile = response.data.user;
      const token = response.data.access;

      setToken(token);
      login(userProfile);

      navigate("/home");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getProfile();

      if (response && response.status === 200) {
        login(response.data);
        navigate("/home");
      }

      setLoading(false);
    };

    const refreshToken = async () => {
      const response = await refresh();
      if (response && response.status === 200) {
        setToken(response.data.access);

        fetchUser();
      } else {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

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
          password
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
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background700};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 12px;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
