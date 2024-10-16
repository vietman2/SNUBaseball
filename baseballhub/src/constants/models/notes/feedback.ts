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

export type FeedbackResponseType = {
  new: FeedbackSimpleType[];
  in_progress: FeedbackSimpleType[];
  under_review: FeedbackSimpleType[];
  done: FeedbackSimpleType[];
};

export type FeedbackDetailType = {
  id: number;
  title: string;
  content: string;
  player: AuthorType;
  author: AuthorType;
  category: ClassificationType;
  status: string;
  created_at: string;
  updated_at: string;
  num_views: number;
  comments: string[]; // TODO: Change to CommentType[]
  num_comments: number;
};
