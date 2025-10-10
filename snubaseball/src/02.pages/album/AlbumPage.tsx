import { Metadata } from "next";

import { MediaGrid } from "./ui/MediaGrid";
import { Breadcrumb, BreadcrumbItemType } from "@widgets/breadcrumb";
import { PageContainer } from "@widgets/layout-templates";
import { getAlbumMedia } from "@entities/albums/server";

interface Props {
  params: Promise<{ albumTitle: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { albumTitle } = await params;
  const decodedTitle = decodeURIComponent(albumTitle);

  return {
    title: `${decodedTitle} | 서울대 야구부`,
  };
}

export async function AlbumPage({ params, searchParams }: Readonly<Props>) {
  const { albumTitle } = await params;
  const { page } = await searchParams;

  const decodedTitle = decodeURIComponent(albumTitle);
  const pageNumber = page ? parseInt(page, 10) : 1;

  // searchParam에서 page를 받아와서 getAlbumMedia에 넘긴다
  const media = await getAlbumMedia(decodedTitle, { page: pageNumber });

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "갤러리", href: "/gallery", isLastItem: false },
    { label: decodedTitle, href: null, isLastItem: true },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />
      <MediaGrid totalPages={media.pages} media={media.results} />
    </PageContainer>
  );
}
