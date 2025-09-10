import "server-only";

import { MemberType } from "../models/members";
import { BACKEND_API_URL } from "@shared/configs/backend";
import { SNUBaseballAPIError } from "@shared/configs/error";

type ResponseType = {
  players: MemberType[];
  managers: MemberType[];
};

export async function getActiveMembers(): Promise<ResponseType> {
  const response = await fetch(`${BACKEND_API_URL}/v1/members/`, {
    cache: "force-cache",
    next: { revalidate: 60, tags: ["members"] },
  });

  if (!response.ok) {
    const result = await response.json();

    throw new SNUBaseballAPIError(
      `데이터를 불러오는 중에 오류가 발생했습니다: ${result.message}`
    );
  }

  return response.json();
}
