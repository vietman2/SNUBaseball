import type { MediaType } from "../models/media";
import { ProgressiveImage } from "@shared/ui/Images";
import { Skeleton } from "@shared/ui/Loading";

export function MediaCardSkeleton() {
  return <Skeleton height={300} width={300} borderRadius={16} />;
}

interface Props {
  media: MediaType;
}

export function MediaCard({ media }: Readonly<Props>) {
  if (media.type === "IMAGE") {
    return <ProgressiveImage src={media.url} alt={media.key} />;
  }
  return (
    <ProgressiveImage src={media.thumbnail_url} alt={media.key} type="VIDEO" />
  );
}
