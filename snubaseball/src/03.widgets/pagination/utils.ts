export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const Ellipsis = "…";

export function getItems(page: number, totalPages: number, siblingCount: number) {
  if (totalPages <= 1) return [];
  const cur = clamp(page, 1, totalPages);

  // 항상 보여줄 경계: 1, totalPages
  const items: Array<number | typeof Ellipsis> = [1];

  // 중간 구간 계산 (2 ~ totalPages-1 사이)
  const start = Math.max(2, cur - siblingCount);
  const end = Math.min(totalPages - 1, cur + siblingCount);

  // 좌측 … 필요 여부 (start가 2보다 오른쪽이면 생략부 존재)
  if (start > 2) items.push(Ellipsis);

  // 중간 숫자들
  for (let i = start; i <= end; i++) items.push(i);

  // 우측 … 필요 여부 (end가 마지막-1보다 왼쪽이면 생략부 존재)
  if (end < totalPages - 1) items.push(Ellipsis);

  // 마지막 페이지
  items.push(totalPages);

  return items;
}
