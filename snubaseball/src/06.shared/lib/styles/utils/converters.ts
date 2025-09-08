function toInt(str: string) {
  const n = parseInt(str, 16);

  return isNaN(n) ? 0 : n;
}

function normalizeHex(hex: string) {
  const h = hex.trim().replace(/^#/, "");
  if (![3, 4, 6, 8].includes(h.length)) {
    console.warn(`Invalid hex color: ${hex}`);
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  // 3/4자리 -> 6/8자리 확장
  const full =
    h.length === 3 || h.length === 4
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;

  const hasAlpha = full.length === 8;
  const r = toInt(full.slice(0, 2));
  const g = toInt(full.slice(2, 4));
  const b = toInt(full.slice(4, 6));
  const a = hasAlpha ? parseInt(full.slice(6, 8), 16) / 255 : undefined;

  return { r, g, b, a };
}

export function hexToRgb(hex: string) {
  const { r, g, b } = normalizeHex(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

export function hexToRgba(hex: string, alpha?: number) {
  const { r, g, b, a } = normalizeHex(hex);
  // alpha 인자를 우선, 없으면 hex 내 알파 사용, 최종 기본값 1
  const finalA = Math.max(0, Math.min(1, alpha ?? a ?? 1));
  return `rgba(${r}, ${g}, ${b}, ${finalA})`;
}
