import styled from "styled-components";

interface Props {
  label?: string;
}

export function ImagePlaceholder({ label }: Readonly<Props>) {
  return <MockImage>{label ? <span>{label}</span> : null}</MockImage>;
}

const MockImage = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  max-width: 160px;
  aspect-ratio: 1 / 1;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray200};

  > span {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
