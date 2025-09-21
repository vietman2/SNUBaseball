import styled from "styled-components";

interface InfoProps {
  label: string;
  value: string;
}

export function MemberInfoItem({ label, value }: Readonly<InfoProps>) {
  return (
    <ItemContainer>
      <span>{label}</span>
      <span>{value}</span>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  > span:first-child {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
    font-size: 1rem;
  }

  > span:last-child {
    color: ${({ theme }) => theme.colors.textDisabled};
    font-weight: 400;
    font-size: 0.875rem;
  }
`;
