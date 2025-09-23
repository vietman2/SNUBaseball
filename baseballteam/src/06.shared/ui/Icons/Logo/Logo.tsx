import styled from "styled-components";

interface Props {
  size?: number;
  type?: "BLUE" | "SILVER";
  horizontal?: boolean;
}

export function Logo({
  size = 100,
  type = "BLUE",
  horizontal = false,
}: Readonly<Props>) {
  return (
    <Wrapper>
      <img
        src={
          type === "BLUE"
            ? "https://cdn.snubaseball.co.kr/images/logo_blue.png"
            : "https://cdn.snubaseball.co.kr/images/logo_silver.png"
        }
        alt="Logo"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {horizontal && (
        <span style={{ fontSize: `${(size / 3) * 2}px` }}>서울대 야구부</span>
      )}
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
