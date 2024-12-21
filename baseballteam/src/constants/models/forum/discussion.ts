import { GenericCommentType } from "@models/app";
import { AuthorType } from "@models/user";

export type DiscussionSimpleType = {
  id: number;
  title: string;
  author: string;
  num_views: number;
  num_comments: number;
  num_likes: number;
  created_at: string;
  has_attachment: boolean;
};

type DiscussionAttachmentType = {
  file: string;
  name: string;
  created_at: string;
};

type DiscussionCommentType = GenericCommentType;

export type DiscussionDetailType = {
  id: number;
  title: string;
  content: string;
  author: AuthorType;
  num_views: number;
  num_likes: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  comments: DiscussionCommentType[];
  attachments: DiscussionAttachmentType[];
};
