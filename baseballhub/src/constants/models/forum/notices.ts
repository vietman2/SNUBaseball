import { AuthorType } from "@models/user";

export type NoticeCategoryType = {
  label: string;
  color: string;
  background_color: string;
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
  author: AuthorType;
  num_views: number;
  created_at: string;
  comments: string[]; // TODO: Change to CommentType[]
};
