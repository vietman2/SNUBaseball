import { GenericCommentType } from "@models/app";
import { AuthorType } from "@models/user";

export type ClassificationType = {
  label: string;
  background_color: string;
  color: string;
};

export type FeedbackSimpleType = {
  id: number;
  title: string;
  content: string;
  player: string;
  author: string;
  category: ClassificationType;
  status: {
    label: string;
    color: string;
    background_color: string;
  };
  created_at: string;
  updated_at: string;
  num_comments: number;
};

export type FeedbackCommentType = GenericCommentType;

export type FeedbackDetailType = {
  id: number;
  title: string;
  content: string;
  player: AuthorType;
  author: AuthorType;
  category: ClassificationType;
  status: {
    label: string;
    color: string;
    background_color: string;
  };
  created_at: string;
  updated_at: string;
  num_views: number;
  comments: FeedbackCommentType[];
  num_comments: number;
};
