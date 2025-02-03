import styled from "styled-components";

export function ErrorPage() {
  return (
    <FullScreen>
      <div>존재하지 않는 페이지입니다.</div>
    </FullScreen>
  );
}

const FullScreen = styled.div`
  display: flex;
  flex: 1;
  width: 100dvw;
  height: 100dvh;
  justify-content: center;
  align-items: center;
`;
