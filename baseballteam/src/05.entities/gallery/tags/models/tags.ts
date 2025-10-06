export const tagIconChoices = ["tag", "hashtag", "person", "bat"];

export type MediaTagType = {
  id: number;
  name: string;
  color: string;
  icon: string;
  num_images: number;
  num_videos: number;
};

export const sampleTags: MediaTagType[] = [
  {
    id: 1,
    name: "시즌",
    color: "#FF5733",
    icon: "tag",
    num_images: 10,
    num_videos: 5,
  },
  {
    id: 2,
    name: "야구",
    color: "#33C1FF",
    icon: "bat",
    num_images: 8,
    num_videos: 2,
  },
  {
    id: 3,
    name: "단체사진",
    color: "#75FF33",
    icon: "hashtag",
    num_images: 5,
    num_videos: 1,
  },
  {
    id: 4,
    name: "개인사진",
    color: "#FF33C1",
    icon: "person",
    num_images: 3,
    num_videos: 4,
  },
];
