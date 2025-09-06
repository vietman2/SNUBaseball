// 02: 2-3-4 / 2-4-4
// 그 외: 3-3-4 / 3-4-4
export function formatPhoneKR(input: string): string {
  const raw = input.replace(/\D/g, "");
  if (!raw) return "";

  // 02 (최대 10자리: 2 + 8)
  if (raw.startsWith("02")) {
    const d = raw.slice(0, 10);
    if (d.length <= 2) return d; // "0", "02"
    if (d.length <= 5) return `02-${d.slice(2)}`; // 2-최대3
    const secondLen = d.length <= 9 ? 3 : 4; // 총 9이하면 2-3-4, 아니면 2-4-4
    return `02-${d.slice(2, 2 + secondLen)}-${d.slice(2 + secondLen)}`;
  }

  // 일반 (최대 11자리: 3 + 8)
  const d = raw.slice(0, 11);
  if (d.length <= 3) return d; // 3
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`; // 3-최대4

  // ✅ 총 길이가 10이면 3-3-4, 11이면 3-4-4
  const secondLen = d.length <= 10 ? 3 : 4;
  return `${d.slice(0, 3)}-${d.slice(3, 3 + secondLen)}-${d.slice(
    3 + secondLen
  )}`;
}
