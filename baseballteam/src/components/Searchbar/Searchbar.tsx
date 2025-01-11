import styled from "styled-components";

import { AppIcon } from "@components/Icons";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

export function Searchbar({ query, setQuery }: Readonly<Props>) {
  return (
    <Container>
      <AppIcon icon="search" size={16} color="#252525" />
      <input
        placeholder="검색어를 입력하세요"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        data-testid="searchbar"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  padding: 0 12px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background300};

  input {
    flex: 1;
    padding: 8px;
    border: none;
    outline: none;
    font-size: 16px;

    background-color: transparent;
  }
`;
