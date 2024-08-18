import styled from "styled-components";

interface TableProps {
  children: React.ReactNode;
}

export function SimpleTable({ children }: TableProps) {
  return <Table>{children}</Table>;
}

interface RowProps {
  left: string;
  right: string;
}

export function TableRow({ left, right }: RowProps) {
  return (
    <Row>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Row>
  );
}

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-top: 1px solid #cecece;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
`;

const Left = styled.div`
  display: flex;
  flex: 4;
  justify-content: center;
  font-size: 16px;
  border-right: 1px solid #cecece;
  padding: 5px 10px;
`;

const Right = styled.div`
  display: flex;
  flex: 6;
  justify-content: center;
  font-size: 16px;
  padding: 5px 10px;
`;
