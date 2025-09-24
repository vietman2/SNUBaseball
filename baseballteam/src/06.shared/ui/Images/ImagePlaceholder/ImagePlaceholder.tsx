import styled from "styled-components";

interface Props {
  width: string;
  height: string;
  borderRadius: string;
  label?: string;
}

export function ImagePlaceholder({
  width,
  height,
  borderRadius,
  label,
}: Readonly<Props>) {
  return (
    <div style={{ width, height }}>
      <MockImage style={{ borderRadius }}>
        {label ? <span>{label}</span> : null}
      </MockImage>
    </div>
  );
}

const MockImage = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray200};

  > span {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
