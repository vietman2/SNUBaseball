import { sampleAuthor } from "@data/user";
import {
  ClassificationType,
  FeedbackResponseType,
  FeedbackDetailType,
} from "@models/notes";

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

export const sampleFeedbacks: FeedbackResponseType = {
  new: {
    label: "New",
    data: [
      {
        id: 3,
        title: "타격 시 스윙이 왼팔에 막혀있음",
        content: "왼팔을 좀 더 부드럽게 쓸 것",
        player: "김택원",
        author: "이서준",
        category: classification_batting,
        status: "완료",
        created_at: "2024-08-01",
        updated_at: "2024-10-01",
        num_comments: 0,
      },
    ],
    color: "#FF453A",
    background_color: "#FF453A20",
  },
  in_progress: {
    label: "In Progress",
    data: [
      {
        id: 2,
        title: "리드시 시야",
        content: "무조건 투수만 바라보기.",
        player: "이상현",
        author: "이정호",
        category: classification_running,
        status: "진행중",
        created_at: "2024-08-01",
        updated_at: "2024-10-01",
        num_comments: 1,
      },
    ],
    color: "#34C759",
    background_color: "#34C75920",
  },
  under_review: {
    label: "Under Review",
    data: [
      {
        id: 4,
        title: "외야 타구 송구동작 연결",
        content: "공 빨리 빼고 송구동작으로 연결시킬 것",
        player: "이유용",
        author: "이정호",
        category: classification_defense,
        status: "검토중",
        created_at: "2024-08-01",
        updated_at: "2024-10-01",
        num_comments: 3,
      },
    ],
    color: "#FFD60A",
    background_color: "#FFD60A20",
  },
  done: {
    label: "Done",
    data: [
      {
        id: 1,
        title: "스로잉",
        content: "왼발을 끌면서 던지지 말고 바로 내리면서 던질 것",
        player: "심민수",
        author: "박건우",
        category: classification_batting,
        status: "완료",
        created_at: "2024-08-01",
        updated_at: "2024-10-01",
        num_comments: 2,
      },
    ],
    color: "#007AFF",
    background_color: "#007AFF20",
  },
};

export const sampleFeedbackDetail: FeedbackDetailType = {
  id: 1,
  title: "스로잉",
  content: "왼발을 끌면서 던지지 말고 바로 내리면서 던질 것",
  player: sampleAuthor,
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
  comments: ["asdf"],
  num_comments: 2,
};
