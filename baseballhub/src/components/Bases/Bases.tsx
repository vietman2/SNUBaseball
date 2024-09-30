import styled from "styled-components";

interface Props {
  first: boolean;
  second: boolean;
  third: boolean;
}

export function Bases({ first, second, third }: Readonly<Props>) {
  return (
    <DiamondWrapper>
      <Base bottom={11} left={11} $loaded={first} />
      <Base bottom={11} left={0} $loaded={second} />
      <Base bottom={0} left={0} $loaded={third} />
    </DiamondWrapper>
  );
}

const DiamondWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21px;
  width: 21px;
  margin-top: 5px;
  position: relative;
  transform: rotate(45deg);
`;

const Base = styled.div<{ bottom: number; left: number; $loaded: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ $loaded }) => ($loaded ? "black" : "white")};
  border: 2px solid black;
  position: absolute;

  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
`;
