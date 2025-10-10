import "server-only";

import { MediaResponseType } from "../models/media";
import { BACKEND_API_URL } from "@shared/configs/backend";
import { SNUBaseballAPIError } from "@shared/configs/error";

export async function getAlbumMedia(
  albumTitle: string,
  options: { page: number }, //, signal?: AbortSignal
): Promise<MediaResponseType> {
  const { page } = options;

  const url = new URL(`${BACKEND_API_URL}/v1/gallery/media/`);
  url.searchParams.append("album", albumTitle);
  url.searchParams.append("page", page.toString());

  const response = await fetch(url.toString(), {
    cache: "force-cache",
    next: {
      revalidate: 60, // 1시간
      tags: ["albums", `album-${albumTitle}`],
    },
    //signal,
  });

  if (!response.ok) {
    const result = await response.json();

    throw new SNUBaseballAPIError(
      `데이터를 불러오는 중에 오류가 발생했습니다: ${result.message}`
    );
  }

  return response.json();
}
