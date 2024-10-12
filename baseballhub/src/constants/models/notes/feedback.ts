export type ClassificationType = {
  type: string;
  backgroundColor: string;
  color: string;
};

export type FeedbackType = {
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
  new: FeedbackType[];
  in_progress: FeedbackType[];
  under_review: FeedbackType[];
  done: FeedbackType[];
};
