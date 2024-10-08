import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export function PageHeader({ children }: Props) {
  return <Header>{children}</Header>;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  gap: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
