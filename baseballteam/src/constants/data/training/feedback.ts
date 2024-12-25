import { sampleAuthor, sampleMembers } from "@data/user";
import {
  ClassificationType,
  FeedbackSimpleType,
  FeedbackDetailType,
} from "@models/training";

const classification_defense: ClassificationType = {
  label: "수비",
  background_color: "#C5CAE9",
  color: "#1A237E",
};

const classification_batting: ClassificationType = {
  label: "타격",
  background_color: "#FFCCBC",
  color: "#BF360C",
};

const classification_running: ClassificationType = {
  label: "주루",
  background_color: "#B3E5FC",
  color: "#01579B",
};

export const sampleFeedbacks: FeedbackSimpleType[] = [
  {
    id: 1,
    title: "스로잉",
    content: "왼발을 끌면서 던지지 말고 바로 내리면서 던질 것",
    player: "심민수",
    author: "박건우",
    category: classification_batting,
    status: classification_running,
    created_at: "2024-08-01",
    updated_at: "2024-10-01",
    num_comments: 2,
  },
  {
    id: 2,
    title: "리드시 시야",
    content: "무조건 투수만 바라보기.",
    player: "이상현",
    author: "이정호",
    category: classification_running,
    status: classification_running,
    created_at: "2024-08-01",
    updated_at: "2024-10-01",
    num_comments: 1,
  },
  {
    id: 3,
    title: "타격 시 스윙이 왼팔에 막혀있음",
    content: "왼팔을 좀 더 부드럽게 쓸 것",
    player: "김택원",
    author: "이서준",
    category: classification_batting,
    status: classification_running,
    created_at: "2024-08-01",
    updated_at: "2024-10-01",
    num_comments: 0,
  },
  {
    id: 4,
    title: "외야 타구 송구동작 연결",
    content: "공 빨리 빼고 송구동작으로 연결시킬 것",
    player: "이유용",
    author: "이정호",
    category: classification_defense,
    status: classification_running,
    created_at: "2024-08-01",
    updated_at: "2024-10-01",
    num_comments: 3,
  },
];

export const sampleFeedbackDetail: FeedbackDetailType = {
  id: 1,
  title: "스로잉",
  content: "왼발을 끌면서 던지지 말고 바로 내리면서 던질 것",
  player: sampleMembers[0],
  author: sampleAuthor,
  category: classification_batting,
  status: {
    label: "완료",
    color: "#007AFF",
    background_color: "#007AFF20",
  },
  created_at: "2024-08-01",
  updated_at: "2024-10-01",
  num_views: 100,
  comments: [
    {
      id: 1,
      author: sampleAuthor,
      content: "댓글 1",
      created_at: "2024-04-02",
    },
  ],
  num_comments: 2,
};

export const sampleClassification: ClassificationType[] = [
  classification_batting,
  classification_defense,
  classification_running,
];
