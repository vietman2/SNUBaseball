import { Grid } from "./ui/MediaGrid";
import { PageContainer } from "@widgets/layout-templates";
import { MediaCardSkeleton } from "@entities/albums";

export function AlbumPageLoading() {
  return (
    <PageContainer>
      <h1>앨범</h1>
      <Grid>
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
        <MediaCardSkeleton />
      </Grid>
    </PageContainer>
  );
}
