export type AlbumType = {
  id: number;
  title: string;
  members_only: boolean;
  color: string;
  cover_image_url: string;
  num_images: number;
  num_videos: number;
};

export const sampleAlbums: AlbumType[] = [
  // 첫번째는 기본 앨범
  {
    id: 1,
    title: "기본 앨범",
    members_only: false,
    color: "#FF5733",
    cover_image_url: "https://via.placeholder.com/600",
    num_images: 10,
    num_videos: 2,
  },
  // 두번째는 빈 앨범
  {
    id: 2,
    title: "빈 앨범",
    members_only: false,
    color: "#33C1FF",
    cover_image_url: "",
    num_images: 0,
    num_videos: 0,
  },
  // 세번째는 부원 전용 앨범
  {
    id: 3,
    title: "부원 전용 앨범",
    members_only: true,
    color: "#75FF33",
    cover_image_url: "https://via.placeholder.com/600",
    num_images: 25,
    num_videos: 5,
  },
];

export type AlbumSimpleType = {
  id: number;
  title: string;
  members_only: boolean;
  color: string;
};

export const sampleAlbumSimple: AlbumSimpleType = {
  id: 1,
  title: "기본 앨범",
  members_only: false,
  color: "#FF5733",
};
