import { GenericCommentType } from "@models/app";
import { AuthorType } from "@models/user";

export type GuidelineChipType = {
  label: string;
  color: string;
  background_color: string;
};

export type GuidelineSimpleType = {
  id: number;
  type: GuidelineChipType;
  location: GuidelineChipType;
  title: string;
  author: string;
  created_at: string;
  preview_image: string;
  num_likes: number;
  num_comments: number;
  num_people: string;
};

export type GuidelineCommentType = GenericCommentType;

export type GuidelineDetailType = {
  id: number;
  type: GuidelineChipType;
  location: GuidelineChipType;
  title: string;
  author: AuthorType;
  content: string;
  created_at: string;
  video_id: string;
  comments: GuidelineCommentType[];
  min_people: number;
  max_people: number;
  is_liked: boolean;
  is_drill: boolean;
  num_likes: number;
};
