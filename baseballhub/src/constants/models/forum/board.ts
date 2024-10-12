export type PostType = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  tag: string;
  comments: CommentType[];
};

export type CommentType = {
  id: number;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
};
