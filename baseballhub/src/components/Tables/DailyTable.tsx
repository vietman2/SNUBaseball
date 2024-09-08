import styled from "styled-components";

export function DailyTable() {
  return (
    <Table>
      <colgroup>
        <col style={{ width: "15%", backgroundColor: "lightgray" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
      </colgroup>
      <TableHeader>
        <TableRow>
          <th>시간</th>
          <th>조</th>
          <th>훈련내용</th>
          <th>장소</th>
          <th>비고</th>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <td>17:00~17:20</td>
          <td>전체</td>
          <td>땅정비</td>
          <td>운동장</td>
          <td>물뿌리기 당번: 김유안, 양서진</td>
        </TableRow>
        <TableRow>
          <td>17:20~17:35</td>
          <td>전체</td>
          <td>워밍업</td>
          <td>운동장</td>
          <td></td>
        </TableRow>
        <TableRow>
          <td rowSpan={2}>17:35~18:00</td>
          <td>내야</td>
          <td>펑고</td>
          <td>운동장</td>
          <td>펑고: 이유용</td>
        </TableRow>
        <TableRow>
          <td>외야</td>
          <td>배팅</td>
          <td>배팅케이지</td>
          <td></td>
        </TableRow>
        <TableRow>
          <td>18:00~18:05</td>
          <td>전체</td>
          <td>휴식</td>
          <td>벤치</td>
          <td></td>
        </TableRow>
        <TableRow>
          <td rowSpan={2}>18:05~18:30</td>
          <td>내야</td>
          <td>배팅</td>
          <td>배팅케이지</td>
          <td></td>
        </TableRow>
        <TableRow>
          <td>외야</td>
          <td>펑고</td>
          <td>운동장</td>
          <td>펑고: 김유안</td>
        </TableRow>
        <TableRow>
          <td>18:30~20:00</td>
          <td>전체</td>
          <td>자율훈련</td>
          <td></td>
          <td></td>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
`;
