import { sampleMemberMinis } from "@data/user";
import {
  AlbumType,
  ImageType,
  MediaResponseType,
  MediaTagType,
  MediaType,
} from "@models/archive";

export const sampleMedia: MediaType[] = [
  {
    id: 1,
    url: "https://via.placeholder.com/150",
    type: "이미지",
    width: 150,
    height: 150,
  },
  {
    id: 2,
    url: "https://via.placeholder.com/150",
    type: "비디오",
    width: 150,
    height: 150,
    length: 180,
  },
];

export const sampleAlbums: AlbumType[] = [
  {
    id: 1,
    title: "2025년 1월",
    description: "",
    cover_images: [],
    num_images: 0,
    num_videos: 0,
  },
  {
    id: 2,
    title: "2025년 2월",
    description: "",
    cover_images: [sampleMedia[0]],
    num_images: 0,
    num_videos: 0,
  },
];

export const sampleMediaResponse: MediaResponseType = {
  count: 1,
  current_page: 1,
  next: null,
  num_pages: 1,
  previous: null,
};

export const sampleImageDetail: ImageType = {
  id: 1,
  url: "https://via.placeholder.com/150",
  title: "이미지1",
  album: {
    id: 1,
    title: "2025년 1월",
  },
  tags: [],
  people: [],
  uploaded_at: "2025-01-01T00:00:00",
  uploaded_by: sampleMemberMinis[0],
  exif_data: {
    DateTimeOriginal: "2025-01-01T00:00:00",
    Make: "Canon",
    Model: "EOS 5D",
  },
};

export const sampleTags: MediaTagType[] = [
  {
    id: 1,
    name: "태그1",
  },
  {
    id: 2,
    name: "태그2",
  },
];
