import "server-only";

import { RosterMemberDetailsType } from "../models/roster";
import { BACKEND_API_URL } from "@shared/configs/backend";
import { SNUBaseballAPIError } from "@shared/configs/error";

export async function getRosterMember(
  member_id: number
): Promise<RosterMemberDetailsType> {
  const response = await fetch(
    `${BACKEND_API_URL}/v1/teams/members/${member_id}/`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24 * 7, // 일주일
        tags: [`roster-member-${member_id}`],
      },
    }
  );

  if (!response.ok) {
    const result = await response.json();

    throw new SNUBaseballAPIError(
      `데이터를 불러오는 중에 오류가 발생했습니다: ${result.message}`
    );
  }

  return response.json();
}
