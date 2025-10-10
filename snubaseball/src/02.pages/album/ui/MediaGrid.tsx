"use client";

import styled from "styled-components";

import { Pagination, usePagination } from "@widgets/pagination";
import { MediaCard, MediaType } from "@entities/albums";

interface Props {
  totalPages: number;
  media: MediaType[];
}

export function MediaGrid({ totalPages, media }: Readonly<Props>) {
  const { page, setPage } = usePagination();

  const openMedia = (media: MediaType) => {
    window.open(media.url, "_blank");
  };

  return (
    <Container>
      <Grid>
        {media.map((item) => (
          <button
            key={item.key}
            onClick={() => openMedia(item)}
            data-testid={`media-button-${item.key}`}
          >
            <MediaCard key={item.key} media={item} />
          </button>
        ))}
      </Grid>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Loading 페이지에서도 사용하기 때문에 export 필요
export const Grid = styled.div`
  --min: max(120px, 15%);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
  gap: 16px;

  > button {
    all: unset;
    cursor: pointer;
  }
`;
