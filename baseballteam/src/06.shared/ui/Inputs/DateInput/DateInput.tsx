import type { JSX } from "react";

type DateInputProps = {
  /** ISO("YYYY-MM-DD")가 아니거나 null이어도 됨 */
  value: string | null;
  /** 변경 시 ISO("YYYY-MM-DD") 또는 null로 반환 */
  onChange: (value: string | null) => void;
} & Omit<JSX.IntrinsicElements["input"], "value" | "onChange" | "type">;

const toDigits = (s: string) => s.replace(/\D/g, "");

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const isValidISO = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return false;
  const y = +m[1],
    mo = +m[2],
    d = +m[3];
  if (mo < 1 || mo > 12) return false;
  const mdays = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][mo - 1];
  return d >= 1 && d <= mdays;
};

/** ISO로 정규화 (실패 시 빈 문자열 반환) */
const normalizeToISO = (input: string | null | undefined): string => {
  if (!input) return "";
  const s = input.trim();
  if (isValidISO(s)) return s;
  const digits = toDigits(s);
  if (digits.length === 8) {
    const iso = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(
      6,
      8
    )}`;
    return isValidISO(iso) ? iso : "";
  }
  return "";
};

export function DateInput({
  value,
  onChange,
  ...rest
}: Readonly<DateInputProps>) {
  const display = normalizeToISO(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value; // '' 또는 'YYYY-MM-DD'
    onChange(v === "" ? null : v);
  };

  return (
    <input type="date" value={display} onChange={handleChange} {...rest} />
  );
}
