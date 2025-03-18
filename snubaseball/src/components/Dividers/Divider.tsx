import styled from "styled-components";

interface Props {
  text?: string;
  width?: string;
  type?: "solid" | "dashed";
  paddingRight?: string;
}

export function Divider({
  text,
  width,
  type = "solid",
  paddingRight = "20px",
}: Readonly<Props>) {
  if (type === "solid") {
    return <SolidLine style={{ width }} />;
  } else {
    return (
      <DashedLine style={{ width }}>
        <span style={{ paddingRight }}>{text}</span>
      </DashedLine>
    );
  }
}

const SolidLine = styled.div`
  height: 1px;
  width: 100%;
  margin: 15px 0 5px 0;
  background: ${({ theme }) => theme.colors.lowEmphasis};
`;

const DashedLine = styled.div`
  position: relative;
  height: 1px;
  width: 100%;
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

  span {
    position: absolute;
    right: 0;
    top: -12px;
    background-color: white;
    padding-left: 15px;
    padding-right: 20px;
    font-size: 20px;
    color: #0f0f70;
    z-index: 1;
  }
`;
