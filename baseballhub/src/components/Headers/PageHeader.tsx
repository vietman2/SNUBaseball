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

  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.background700};  
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;
