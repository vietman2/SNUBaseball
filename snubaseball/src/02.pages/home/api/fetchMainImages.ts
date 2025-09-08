import "server-only";

// TODO: 추후 매니저들이 직접 이미지를 선택하여 홈페이지에 반영할 수 있도록

export async function fetchMainImages(): Promise<string[]> {
  return [
    "https://cdn.snubaseball.co.kr/images/Main1.jpg",
    "https://cdn.snubaseball.co.kr/images/Main2.jpg",
    "https://cdn.snubaseball.co.kr/images/Main3.jpg",
  ];
}
