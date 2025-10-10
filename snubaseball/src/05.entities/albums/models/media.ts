type CommonFields = {
  id: number;
  key: string;
  url: string;
  filename: string;
  created_at: string;
};

type GalleryImageType = {
  type: "IMAGE";
} & CommonFields;

type GalleryVideoType = {
  type: "VIDEO";
  thumbnail_url: string;
} & CommonFields;

export type MediaType = GalleryImageType | GalleryVideoType;

export type MediaResponseType = {
  count: number;
  pages: number;
  page: number;
  page_size: number;
  results: MediaType[];
};

const sampleMedia: MediaType[] = [
  // 2 images and 1 video
  {
    id: 1,
    type: "IMAGE",
    key: "sample-image-1.jpg",
    url: "https://example.com/sample-image-1.jpg",
    filename: "sample-image-1.jpg",
    created_at: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    type: "IMAGE",
    key: "sample-image-2.jpg",
    url: "https://example.com/sample-image-2.jpg",
    filename: "sample-image-2.jpg",
    created_at: "2023-10-02T12:00:00Z",
  },
  {
    id: 3,
    type: "VIDEO",
    key: "sample-video-1.mp4",
    url: "https://example.com/sample-video-1.mp4",
    thumbnail_url: "https://example.com/sample-video-1-thumbnail.jpg",
    filename: "sample-video-1.mp4",
    created_at: "2023-10-03T12:00:00Z",
  },
];

export const sampleMediaResponse: MediaResponseType = {
  count: 3,
  pages: 1,
  page: 1,
  page_size: 10,
  results: sampleMedia,
};
