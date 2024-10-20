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
  status: string;
  created_at: string;
  updated_at: string;
  num_comments: number;
};

export type FeedbackListType = {
  label: string;
  data: FeedbackSimpleType[];
  color: string;
  background_color: string;
};

export type FeedbackResponseType = {
  new: FeedbackListType;
  in_progress: FeedbackListType;
  under_review: FeedbackListType;
  done: FeedbackListType;
};

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
  comments: string[]; // TODO: Change to CommentType[]
  num_comments: number;
};
