import styled from "styled-components";

import { EquipmentSimpleType } from "@models/management";

interface HeaderProps {
  wide: boolean;
}

export function EquipmentSimpleHeader({ wide }: Readonly<HeaderProps>) {
  return (
    <Header>
      <Cell>장소</Cell>
      <Cell>분류</Cell>
      <Cell>담당자</Cell>
      <LargeCell>물품</LargeCell>
      {wide && (
        <>
          <Cell>수량</Cell>
          <Cell>상태</Cell>
          <Cell>업데이트 일자</Cell>
        </>
      )}
    </Header>
  );
}

interface Props {
  equipment: EquipmentSimpleType;
  wide: boolean;
}

export function EquipmentSimple({ equipment, wide }: Readonly<Props>) {
  return (
    <Container>
      <LargeCell>{equipment.name}</LargeCell>
      {wide && (
        <>
          <Cell>{equipment.number}</Cell>
          <Cell>{equipment.status}</Cell>
          <Cell>{equipment.updated_at}</Cell>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;

  color: ${({ theme }) => theme.colors.foreground700};

  border-radius: 8px;
`;

const Header = styled(Container)`
  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 700;

  background-color: ${({ theme }) => theme.colors.background900};
`;

const Cell = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const LargeCell = styled(Cell)`
  flex: 2;
`;
