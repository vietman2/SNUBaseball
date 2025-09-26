import styled from "styled-components";

import type { MediaThumbnailType } from "../models/media";
import { Skeleton } from "@shared/ui/Loading";

export function ThumbnailSkeleton() {
  return <Skeleton height={300} width={300} borderRadius={16} />;
}

interface Props {
  media: MediaThumbnailType;
}

export function Thumbnail({ media }: Readonly<Props>) {
  return <Image src={media.url} alt={String(media.id)} />;
}

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
`;
