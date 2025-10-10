export type AlbumType = {
  id: number;
  title: string;
  color: string;
  cover_image_url: string;
  num_images: number;
  num_videos: number;
};

export const sampleAlbums: AlbumType[] = [
  {
    id: 1,
    title: "2025년 시즌",
    color: "#FF5733",
    cover_image_url: "/images/sample_album_1.jpg",
    num_images: 120,
    num_videos: 5,
  },
  {
    id: 2,
    title: "2024년 시즌",
    color: "#33C1FF",
    cover_image_url: "",
    num_images: 95,
    num_videos: 3,
  },
];
