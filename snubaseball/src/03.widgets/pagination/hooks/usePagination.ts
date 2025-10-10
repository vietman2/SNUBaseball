"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePagination(paramKey?: string, initialPage?: number) {
  paramKey = paramKey ?? "page";
  initialPage = initialPage ?? 1;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리 파라미터에서 현재 페이지 읽기
  const page = useMemo(() => {
    const raw = searchParams.get(paramKey);
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : initialPage;
  }, [searchParams, paramKey, initialPage]);

  // 페이지 변경을 감지하고 URL 업데이트
  const setPage = useCallback(
    (next: number) => {
      const sp = new URLSearchParams(searchParams.toString());
      sp.set(paramKey, String(next));
      const href = `${pathname}?${sp.toString()}`;
      router.push(href);
    },
    [router, pathname, searchParams, paramKey]
  );

  // 추후 다음/이전 페이지로 이동하는 함수

  return { page, setPage };
}
