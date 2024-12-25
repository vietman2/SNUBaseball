import { sampleAuthor } from "@data/user";
import {
  GuidelineChipType,
  GuidelineSimpleType,
  GuidelineDetailType,
  GuidelineCommentType,
} from "@models/training";

const sampleGuidelineCategories: GuidelineChipType = {
  label: "카테고리 1",
  color: "#000000",
  background_color: "#FFFFFF",
};

export const sampleGuidelines: GuidelineSimpleType[] = [
  {
    id: 1,
    type: sampleGuidelineCategories,
    location: sampleGuidelineCategories,
    title: "가이드라인 1",
    author: "작성자 1",
    created_at: "2024-01-01",
    preview_image: "https://via.placeholder.com/150",
    num_likes: 100,
    num_comments: 20,
    num_people: "2명",
  },
  {
    id: 2,
    type: sampleGuidelineCategories,
    location: sampleGuidelineCategories,
    title: "가이드라인 2",
    author: "작성자 2",
    created_at: "2024-01-01",
    preview_image: "https://via.placeholder.com/150",
    num_likes: 100,
    num_comments: 20,
    num_people: "2명",
  },
];

const sampleComments: GuidelineCommentType[] = [
  {
    id: 1,
    content: "댓글 1",
    author: sampleAuthor,
    created_at: "2024-01-01",
  },
];

export const sampleGuidelineDetail: GuidelineDetailType = {
  id: 1,
  type: sampleGuidelineCategories,
  location: sampleGuidelineCategories,
  title: "가이드라인 1",
  author: sampleAuthor,
  content: "내용 1",
  created_at: "2024-01-01",
  video_id: "video_id",
  comments: sampleComments,
  min_people: 1,
  max_people: 3,
  is_liked: false,
  is_drill: true,
  num_likes: 4,
};
