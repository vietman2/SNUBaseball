"use client";

import styled from "styled-components";

import { clamp, getItems } from "./utils";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const ELLIPSIS = "…";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
}: Readonly<Props>) {
  const { colors } = useColors();
  const items = getItems(currentPage, totalPages, siblingCount);

  if (items.length === 0) return null;

  const go = (p: number) => onPageChange(clamp(p, 1, totalPages));

  return (
    <Container aria-label="Pagination">
      <PageButton
        onClick={() => go(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전"
        data-testid="page-button-prev"
      >
        <AppIcon
          icon="chevron-left"
          size={14}
          color={currentPage > 1 ? colors.gray700 : colors.gray500}
        />
      </PageButton>
      {items.map((it, i) =>
        it === ELLIPSIS ? (
          <Ellipsis key={`e-${it}-${i}`} aria-hidden>
            {ELLIPSIS}
          </Ellipsis>
        ) : (
          <PageButton
            key={it}
            $active={it === currentPage}
            aria-current={it === currentPage ? "page" : undefined}
            onClick={() => go(it)}
            data-testid={`page-button-${it}`}
          >
            {it}
          </PageButton>
        )
      )}
      <PageButton
        onClick={() => go(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="다음"
        data-testid="page-button-next"
      >
        <AppIcon
          icon="chevron-right"
          size={14}
          color={currentPage < totalPages ? colors.gray700 : colors.gray500}
        />
      </PageButton>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  gap: 6px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 8px;
  font-size: 0.925rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.gray300};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.background : theme.colors.gray700};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Ellipsis = styled.span`
  min-width: 32px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray500};
`;
