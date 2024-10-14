import { InformationDetailType, InformationSimpleType } from "@models/forum";

export const sampleInformations: InformationSimpleType[] = [
  {
    id: 1,
    title: "부실 청소 가이드",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "창고 정리 가이드",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "신입생 가이드",
    image: "https://via.placeholder.com/150",
  },
];

export const sampleInformationDetail: InformationDetailType = {
  id: 1,
  title: "부실 청소 가이드",
  content: "부실 청소 가이드입니다.",
  image: "https://via.placeholder.com/150",
};
