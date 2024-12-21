import { GenericCommentType } from "@models/app";
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
  num_comments: number;
  num_likes: number;
  created_at: string;
  has_attachment: boolean;
};

type NoticeAttachmentType = {
  file: string;
  name: string;
  created_at: string;
};

export type NoticeCommentType = GenericCommentType;

export type NoticeDetailType = {
  id: number;
  category: NoticeCategoryType;
  title: string;
  content: string;
  author: AuthorType;
  num_views: number;
  num_likes: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  comments: NoticeCommentType[];
  attachments: NoticeAttachmentType[];
};
