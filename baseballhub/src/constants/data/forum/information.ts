import { InformationDetailType, InformationSimpleType } from "@models/forum";

export const sampleInformations: InformationSimpleType[] = [
  {
    id: 1,
    title: "부실 청소 가이드",
    author: "강지민",
    created_at: "2024-09-01",
    num_views: 100,
    pin: true,
  },
  {
    id: 2,
    title: "창고 정리 가이드",
    author: "김유안",
    created_at: "2024-09-02",
    num_views: 200,
    pin: true,
  },
  {
    id: 3,
    title: "시합 전 영양 보충",
    author: "이정호",
    created_at: "2024-09-03",
    num_views: 7,
    pin: false,
  },
];

export const sampleInformationDetail: InformationDetailType = {
  id: 1,
  title: "부실 청소 가이드",
  content: "부실 청소 가이드입니다.",
  image: "https://via.placeholder.com/150",
};
