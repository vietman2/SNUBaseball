import styled from "styled-components";

interface Props {
  size?: number;
}

export function Logo({ size = 100 }: Readonly<Props>) {
  return (
    <img
      src="https://cdn.snubaseball.co.kr/images/logo_blue.png"
      alt="Logo"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

export function LogoHorizontal({ size = 36 }: Readonly<Props>) {
  return (
    <Wrapper>
      <img
        src="https://cdn.snubaseball.co.kr/images/logo_blue.png"
        alt="Logo"
        style={{ width: `${size}px`, height: "auto" }}
      />
      <span style={{ fontSize: `${(size / 3) * 2}px` }}>서울대 야구부</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;
