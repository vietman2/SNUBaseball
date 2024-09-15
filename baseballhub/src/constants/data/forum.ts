import { PostType, CommentType } from "@models/forum";

export const sampleComments: CommentType[] = [
  {
    id: 1,
    content: "유감입니다.",
    author: "김유안",
    created_at: "2024-09-08",
    updated_at: "2024-09-08",
  },
];

export const samplePosts: PostType[] = [
  {
    id: 1,
    title: "이정호가 매수하는 주식은 왜 항상 떨어질까?",
    content: "ㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂ",
    author: "이정호",
    created_at: "2024-09-08",
    updated_at: "2024-09-08",
    tag: "뻘소리",
    comments: sampleComments,
  },
];
