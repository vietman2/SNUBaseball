import { GuidelineType } from "@models/guideline";

export const sampleGuidelines: GuidelineType[] = [
  {
    id: 1,
    title: "내야수 정면타구 스텝 Drill",
    shared_by: "김유안",
    shared_at: "2024-09-08",
    video_id: "Ak0IsTIKpF4",
    description: "요약 설명입니다.",
    equipment: "야구공 15개, 콘, 글러브",
    tags: ["실내 가능", "인원 3~5명"],
    likes: 10,
    is_liked: false,
  },
  {
    id: 2,
    title: "맨손으로 공 잡기 Drill",
    shared_by: "김유안",
    shared_at: "2024-09-08",
    video_id: "xbZDmXPgRWE",
    description: "요약 설명입니다.",
    equipment: "야구공 15개",
    tags: ["실내 가능", "인원 3~5명"],
    likes: 10,
    is_liked: true,
  },
];
