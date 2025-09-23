import "server-only";

import { RosterType } from "../models/roster";
import { BACKEND_API_URL } from "@shared/configs/backend";
import { SNUBaseballAPIError } from "@shared/configs/error";

export async function getRoster(semester_code: string): Promise<RosterType> {
  const response = await fetch(
    `${BACKEND_API_URL}/v1/teams/?semester=${semester_code}`,
    {
      cache: "force-cache",
      next: { revalidate: 60, tags: [`roster-${semester_code}`] },
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
