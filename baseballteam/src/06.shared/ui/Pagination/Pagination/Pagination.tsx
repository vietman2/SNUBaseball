import { useMemo } from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";

interface Props {
  numPages: number;
  currentPage: number;
}

const PAGE_WINDOW = 10;

export function Pagination({ numPages, currentPage }: Readonly<Props>) {
  const [, setSearchParams] = useSearchParams();

  const total = Math.max(1, numPages);
  const page = Math.min(Math.max(1, currentPage), total);

  const onPageSelect = (p: number) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const clamped = Math.min(Math.max(1, p), total);
      if (clamped === 1) next.delete("page"); // 1페이지는 파라미터에서 제거
      else next.set("page", String(clamped));
      return next;
    });

  const { pagesInBlock } = useMemo(() => {
    const start = Math.floor((page - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
    const end = Math.min(start + PAGE_WINDOW - 1, total);
    return {
      pagesInBlock: Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      ),
    };
  }, [page, total]);

  return (
    <Container as="nav" aria-label="페이지 네비게이션">
      <button
        onClick={() => onPageSelect(1)}
        disabled={page === 1}
        aria-label="첫 페이지"
      >
        ««
      </button>
      <button
        onClick={() => onPageSelect(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        «
      </button>
      {pagesInBlock.map((p) => (
        <button
          key={p}
          className={p === page ? "active-page" : undefined}
          onClick={() => onPageSelect(p)}
          disabled={p === page}
          aria-current={p === page ? "page" : undefined}
          aria-label={`${p} 페이지로 이동`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageSelect(page + 1)}
        disabled={page === total}
        aria-label="다음 페이지"
      >
        »
      </button>
      <button
        onClick={() => onPageSelect(total)}
        disabled={page === total}
        aria-label="마지막 페이지"
      >
        »»
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  > button {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.backgroundPaper};
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;

    &.active-page {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.onPrimary};
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
