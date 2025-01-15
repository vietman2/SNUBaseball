import { sampleAuthor } from "@data/user";
import { MinutesType } from "@models/team";

export const sampleMinutes: MinutesType[] = [
  {
    id: 1,
    title: "회의록 1",
    content: "회의록 내용 1",
    author: sampleAuthor,
    created_at: "2024-04-01",
    updated_at: "2024-04-01",
    attachments: [],
  },
  {
    id: 2,
    title: "회의록 2",
    content: "회의록 내용 2",
    author: sampleAuthor,
    created_at: "2024-10-01",
    updated_at: "2024-10-01",
    attachments: [
      {
        file: "file1",
        name: "file1",
        created_at: "2024-10-01",
      },
      {
        file: "file2",
        name: "file2",
        created_at: "2024-10-01",
      },
    ],
  },
];
