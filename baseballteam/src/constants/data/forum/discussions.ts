import { sampleProfile, sampleAuthor } from "@data/user";
import { DiscussionDetailType, DiscussionSimpleType } from "@models/forum";

export const sampleDiscussions: DiscussionSimpleType[] = [
  {
    id: 1,
    title: "제목 1",
    author: "유저 1",
    num_views: 100,
    num_comments: 2,
    num_likes: 0,
    created_at: "2024-04-01",
    has_attachment: true,
  },
  {
    id: 2,
    title: "제목 2",
    author: "유저 1",
    num_views: 100,
    num_comments: 0,
    num_likes: 0,
    created_at: "2024-10-01",
    has_attachment: false,
  },
];

export const sampleDiscussionDetail: DiscussionDetailType = {
  id: 1,
  title: "제목 1",
  content: "내용 1",
  author: sampleAuthor,
  num_views: 100,
  num_likes: 1,
  is_liked: true,
  is_author: true,
  created_at: "2024-04-01",
  comments: [
    {
      id: 1,
      author: sampleAuthor,
      content: "댓글 1",
      created_at: "2024-04-02",
    },
    {
      id: 2,
      author: sampleProfile,
      content: "댓글 2",
      created_at: "2024-04-03",
    },
  ],
  attachments: [],
};
