import styled from "styled-components";

interface Props {
  text: string;
}

export function Caption({ text }: Props) {
  const formattedText = text.split("\n").map((line, index) => (
    <div>
      {line}
      <NewLine />
    </div>
  ));

  return <CaptionText>{formattedText}</CaptionText>;
}

const CaptionText = styled.div`
  font-size: 14px;
  color: #0f0f70;
  padding: 15px 20px;
`;

const NewLine = styled.br`
  display: block;
  content: "";
  margin-top: 5px;
`;
