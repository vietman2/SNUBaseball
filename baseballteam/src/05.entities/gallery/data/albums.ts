import type { AlbumType } from "../models/album";

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
