import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Logo from "@assets/images/logo.png";
import { TextButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";
import { checkStudentId, signUp } from "@services/auth";

export function SignUp() {
  const [memberId, setMemberId] = useState<number>();
  const [student_id, setStudentId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  const handleCheckStudentId = async () => {
    const response = await checkStudentId(student_id);

    if (!response) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } else if (response.status === 200) {
      alert(`학번이 확인되었습니다. ${response.data.name}님 가입 가능합니다.`);
      setMemberId(response.data.id);
    } else {
      alert(response.error);
    }
  };

  const handleSignUp = async () => {
    if (!memberId) {
      alert("학번을 확인해주세요.");
      return;
    }

    const response = await signUp(
      memberId,
      username,
      password,
      passwordConfirm
    );

    if (!response) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } else if (response.status === 201) {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } else {
      alert(response.error);
    }
  };

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSignUp();
      }
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [handleSignUp]);

  return (
    <Container>
      <Box>
        <LogoImage src={Logo} alt="Logo" />
        <Wrapper>
          <TextInput
            placeholder="학번"
            value={student_id}
            onChange={setStudentId}
            disabled={!!memberId}
          />
          <button onClick={handleCheckStudentId} disabled={!!memberId}>
            확인
          </button>
        </Wrapper>
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
        <TextInput
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          password
        />
        <Buttons>
          <TextButton text="뒤로" onClick={handleGoBack} />
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
  width: 240px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  > button {
    width: 60px;
    padding: 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background100};
    cursor: pointer;
  }

  > button:disabled {
    background-color: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.borderDark};
    cursor: not-allowed;
  }
`;
