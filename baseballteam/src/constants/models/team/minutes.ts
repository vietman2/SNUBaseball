import { AuthorType } from "@models/user";

type MinutesAttachmentType = {
  file: string;
  name: string;
  created_at: string;
};

export type MinutesType = {
  id: number;
  title: string;
  content: string;
  author: AuthorType;
  created_at: string;
  updated_at: string;
  attachments: MinutesAttachmentType[];
};
