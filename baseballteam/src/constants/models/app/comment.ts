import { AuthorType } from "@models/user";

export type GenericCommentType = {
  id: number;
  content: string;
  author: AuthorType;
  created_at: string;
};
