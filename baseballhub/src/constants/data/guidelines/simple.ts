import { GuidelineSimpleType } from "@models/guidelines";

export const sampleGuidelines: GuidelineSimpleType[] = [
  {
    id: 1,
    title: "내야수 정면타구 스텝 Drill",
    shared_by: "김유안",
    shared_at: "09/08",
    video_id: "Ak0IsTIKpF4",
    num_likes: 10,
    num_comments: 5,
    is_drill: true,
    is_indoor_possible: true,
    num_people: "3~5명",
  },
  {
    id: 2,
    title: "맨손으로 공 잡기 Drill (내야수)",
    shared_by: "김유안",
    shared_at: "09/08",
    video_id: "xbZDmXPgRWE",
    num_likes: 10,
    num_comments: 5,
    is_drill: false,
    is_indoor_possible: false,
    num_people: "3~5명",
  },
];
