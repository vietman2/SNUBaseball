import { ClassificationType, FeedbackResponseType, FeedbackType } from "@models/notes";

const classification_defense: ClassificationType = {
  type: "수비",
  backgroundColor: "#C5CAE9",
  color: "#1A237E",
};

const classification_batting: ClassificationType = {
  type: "타격",
  backgroundColor: "#FFCCBC",
  color: "#BF360C",
};

const classification_running: ClassificationType = {
  type: "주루",
  backgroundColor: "#B3E5FC",
  color: "#01579B",
};

export const sampleFeedback: FeedbackType = {
  id: 1,
  title: "asdf",
  content: "qwer",
  player: "zxcv",
  coach: "asdf",
  classification: classification_batting,
  status: "완료",
  created_at: "2024-08-01",
  updated_at: "2024-10-01",
}

export const sampleFeedbacks: FeedbackResponseType = {
  new: [
    {
      id: 3,
      title: "타격 시 스윙이 왼팔에 막혀있음",
      content: "왼팔을 좀 더 부드럽게 쓸 것",
      player: "김택원",
      coach: "이서준",
      classification: classification_batting,
      status: "완료",
      created_at: "2024-08-01",
      updated_at: "2024-10-01",
    },
  ],
  in_progress: [
    {
      id: 2,
      title: "리드시 시야",
      content: "무조건 투수만 바라보기.",
      player: "이상현",
      coach: "이정호",
      classification: classification_running,
      status: "진행중",
      created_at: "2024-08-01",
      updated_at: "2024-10-01",
    },
  ],
  under_review: [
    {
      id: 4,
      title: "외야 타구 송구동작 연결",
      content: "공 빨리 빼고 송구동작으로 연결시킬 것",
      player: "이유용",
      coach: "이정호",
      classification: classification_defense,
      status: "검토중",
      created_at: "2024-08-01",
      updated_at: "2024-10-01",
    },
  ],
  done: [
    {
      id: 1,
      title: "스로잉",
      content: "왼발을 끌면서 던지지 말고 바로 내리면서 던질 것",
      player: "심민수",
      coach: "박건우",
      classification: classification_batting,
      status: "완료",
      created_at: "2024-08-01",
      updated_at: "2024-10-01",
    },
  ],
};
