export type NoticeCategoryType = {
  name: string;
  color: string;
  bgColor: string;
};

export type NoticeSimpleType = {
  id: number;
  category: NoticeCategoryType;
  title: string;
  author: string;
  num_views: number;
  created_at: string;
};

export type NoticeDetailType = {
  id: number;
  category: NoticeCategoryType;
  title: string;
  content: string;
  author: string;
  num_views: number;
  created_at: string;
  comments: string[]; // TODO: Change to CommentType[]
};
