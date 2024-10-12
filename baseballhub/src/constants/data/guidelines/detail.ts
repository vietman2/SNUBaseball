import { GuidelineDetailType } from "@models/guidelines";

export const sampleGuidelineDetail: GuidelineDetailType = {
  id: 1,
  title: "내야수 정면타구 스텝 Drill",
  shared_by: "김유안",
  shared_at: "09/08",
  video_id: "Ak0IsTIKpF4",
  num_likes: 10,
  is_liked: true,
  num_comments: 2,
  comments: [
    {
      id: 1,
      comment: "좋은 Drill입니다.",
      commented_by: "심민수",
      commented_at: "09/08",
    },
    {
      id: 2,
      comment: "잘 배웠습니다.",
      commented_by: "윤동현",
      commented_at: "09/08",
    },
  ],
  is_drill: true,
  is_indoor_possible: true,
  num_people: "3~5명",
};
