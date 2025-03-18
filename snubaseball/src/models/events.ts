export type HomecomingResultType = {
  id: number;
  date: string;
  cover_image: string;
  result: string;
  records: {
    id: number;
    title: string;
    content: string;
  }[];
};
