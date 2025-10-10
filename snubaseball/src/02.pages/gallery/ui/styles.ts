"use client";

import styled from "styled-components";

export const AlbumGrid = styled.div`
  --min: max(180px, 15%);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
  gap: 36px;
`;
