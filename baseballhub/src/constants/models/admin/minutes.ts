export type MinutesSimpleType = {
  id: number;
  title: string;
  date: string;
};

export type MinutesDetailType = {
  id: number;
  title: string;
  date: string;
  attendees: string[];
  content: string;
};
