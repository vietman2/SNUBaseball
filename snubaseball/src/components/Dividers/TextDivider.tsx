import styled from "styled-components";

interface Props {
  text: string;
}

export function TextDivider({ text }: Props) {
  return (
    <Line>
      <Text>{text}</Text>
    </Line>
  );
}

const Line = styled.div`
  position: relative;
  height: 1px;
  width: 95%;
  margin: 15px 0 5px 0;
  background: repeating-linear-gradient(
    to right,
    black 0,
    black 2px,
    transparent 2px,
    transparent 6px,
    black 6px,
    black 8px,
    transparent 8px,
    transparent 12px,
    black 12px,
    black 20px,
    transparent 20px,
    transparent 24px
  );
`;

const Text = styled.span`
  position: absolute;
  right: 0;
  top: -15px;
  background-color: white;
  padding-left: 15px;
  padding-right: 20px;
  font-size: 20px;
  color: #0f0f70;
  z-index: 1;
`;
