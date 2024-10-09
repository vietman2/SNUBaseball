type TagType = {
  id: number;
  name: string;
  bgColor: string;
  color: string;
  icon?: string;
}

export type GuidelineType = {
  id: number;
  title: string;
  shared_by: string;
  shared_at: string;
  video_id: string;
  description: string;
  equipment: string;
  num_likes: number;
  is_liked: boolean;
  num_comments: number;
  is_drill: boolean;
  is_indoor_possible: boolean;
  num_people: string;
};
