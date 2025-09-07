import styled from "styled-components";

interface Props {
  size?: number;
  color?: string;
  bold?: boolean;
}

export function Spinner({ size = 24, color, bold = false }: Readonly<Props>) {
  return (
    <StyledSpinner
      style={{
        width: size,
        height: size,
        borderWidth: bold ? 4 : 2,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderLeftColor: color,
      }}
    />
  );
}

const StyledSpinner = styled.div`
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
