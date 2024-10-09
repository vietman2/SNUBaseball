import { GuidelineType } from "@models/guideline";

export const sampleGuidelines: GuidelineType[] = [
  {
    id: 1,
    title: "내야수 정면타구 스텝 Drill",
    shared_by: "김유안",
    shared_at: "09/08",
    video_id: "Ak0IsTIKpF4",
    description: "요약 설명입니다.",
    equipment: "야구공 15개, 콘, 글러브",
    num_likes: 10,
    is_liked: false,
    num_comments: 5,
    is_drill: true,
    is_indoor_possible: true,
    num_people: "3~5명",
  },
  {
    id: 2,
    title: "맨손으로 공 잡기 Drill",
    shared_by: "김유안",
    shared_at: "09/08",
    video_id: "xbZDmXPgRWE",
    description: "요약 설명입니다.",
    equipment: "야구공 15개",
    num_likes: 10,
    is_liked: true,
    num_comments: 5,
    is_drill: false,
    is_indoor_possible: false,
    num_people: "3~5명",
  },
];
