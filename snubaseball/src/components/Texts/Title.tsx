import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
}

export function Title({ title, subtitle }: Props) {
  return (
    <MainTitle>
      {title} <Subtitle>_ {subtitle}</Subtitle>
    </MainTitle>
  );
}

const MainTitle = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
  padding: 5px 20px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: black;
`;
