export type ClassificationType = {
  type: string;
  backgroundColor: string;
  color: string;
};

export type FeedbackSimpleType = {
  id: number;
  title: string;
  content: string;
  player: string;
  coach: string;
  classification: ClassificationType;
  status: string;
  created_at: string;
  updated_at: string;
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
  player: string;
  coach: string;
  classification: ClassificationType;
  status: string;
  created_at: string;
  updated_at: string;
};
