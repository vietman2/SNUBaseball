import { Metadata } from "next";
import Link from "next/link";

import { AlbumGrid } from "./ui/styles";
import { Breadcrumb, BreadcrumbItemType } from "@widgets/breadcrumb";
import { PageContainer } from "@widgets/layout-templates";
import { AlbumCard } from "@entities/albums";
import { getAlbums } from "@entities/albums/server";

export const metadata: Metadata = {
  title: "갤러리 | 서울대 야구부",
  description: "",
};

export async function GalleryPage() {
  const albums = await getAlbums();

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "갤러리", href: null, isLastItem: true },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />
      <AlbumGrid>
        {albums.map((album) => (
          <Link key={album.id} href={`/gallery/${album.title}`}>
            <AlbumCard album={album} />
          </Link>
        ))}
      </AlbumGrid>
    </PageContainer>
  );
}
