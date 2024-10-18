import { AuthorType } from "@models/user";

export type InformationSimpleType = {
  id: number;
  title: string;
  author: string;
  created_at: string;
  num_views: number;
  pin: boolean;
  has_attachment: boolean;
};

type InformationAttachmentType = {
  file: string;
  name: string;
  created_at: string;
};

export type InformationDetailType = {
  id: number;
  title: string;
  content: string;
  author: AuthorType;
  created_at: string;
  num_views: number;
  pin: boolean;
  attachments: InformationAttachmentType[];
};
