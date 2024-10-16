export type InformationSimpleType = {
  id: number;
  title: string;
  author: string;
  created_at: string;
  num_views: number;
  pin: boolean;
};

export type InformationDetailType = {
  id: number;
  title: string;
  content: string;
  image: string;
};
