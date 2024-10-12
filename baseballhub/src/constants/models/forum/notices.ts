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
