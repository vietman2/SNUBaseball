type ImageType = {
  id: number;
  uri: string;
}

type MemoriesImageType = {
  caption: string;
} & ImageType;

export type MemoriesType = {
  year: string;
  images: MemoriesImageType[];
};

export type InterviewType = {
  id: number;
  title: string;
  member: string;
  date: string;
  images: ImageType[];
}
