import { AlbumGrid } from "./ui/styles";
import { PageContainer } from "@widgets/layout-templates";
import { AlbumCardSkeleton } from "@entities/albums";

export function GalleryPageLoading() {
  return (
    <PageContainer>
      <h1>갤러리</h1>
      <AlbumGrid>
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
        <AlbumCardSkeleton />
      </AlbumGrid>
    </PageContainer>
  );
}
