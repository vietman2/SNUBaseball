export type GuidelineSimpleType = {
  id: number;
  title: string;
  shared_by: string;
  shared_at: string;
  video_id: string;
  num_likes: number;
  num_comments: number;
  is_drill: boolean;
  is_indoor_possible: boolean;
  num_people: string;
};

type GuidelineCommentType = {
  id: number;
  comment: string;
  commented_by: string;
  commented_at: string;
};

export type GuidelineDetailType = {
  id: number;
  title: string;
  shared_by: string;
  shared_at: string;
  video_id: string;
  num_likes: number;
  is_liked: boolean;
  num_comments: number;
  comments: GuidelineCommentType[];
  is_drill: boolean;
  is_indoor_possible: boolean;
  num_people: string;
};
