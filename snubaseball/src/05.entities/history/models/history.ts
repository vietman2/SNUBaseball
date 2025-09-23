type EventType = {
  title: string;
  description?: string;
};

export type MilestoneType = {
  year: string;
  events: EventType[];
  imageUrl?: string;
};
