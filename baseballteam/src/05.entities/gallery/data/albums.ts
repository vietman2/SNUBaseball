import type { AlbumType, AlbumDetailsResponseType } from "../models/album";

export const sampleAlbums: AlbumType[] = [
  // 첫번째는 기본 앨범
  {
    id: 1,
    title: "기본 앨범",
    members_only: false,
    cover_images: [
      {
        id: 1,
        url: "https://via.placeholder.com/150",
        uploaded_at: "2025-01-01",
        uploaded_by: "admin",
      },
    ],
    num_images: 10,
    num_videos: 2,
  },
  // 두번째는 빈 앨범
  {
    id: 2,
    title: "빈 앨범",
    members_only: false,
    cover_images: [],
    num_images: 0,
    num_videos: 0,
  },
  // 세번째는 부원 전용 앨범
  {
    id: 3,
    title: "부원 전용 앨범",
    members_only: true,
    cover_images: [
      {
        id: 2,
        url: "https://via.placeholder.com/150",
        uploaded_at: "2025-01-02",
        uploaded_by: "user1",
      },
      {
        id: 3,
        url: "https://via.placeholder.com/150",
        uploaded_at: "2025-01-03",
        uploaded_by: "user2",
      },
    ],
    num_images: 25,
    num_videos: 5,
  },
];

export const sampleAlbumDetails: AlbumDetailsResponseType = {
  album: sampleAlbums[0],
  media: Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    url: `https://via.placeholder.com/600/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`,
    uploaded_at: `2025-01-${(index % 30) + 1}`.padStart(10, "0"),
    uploaded_by: `user${(index % 5) + 1}`,
  })),
  current_page: 1,
  next_page_url: null,
  prev_page_url: null,
  num_pages: 1,
  total_media: 12,
};
