import type { JSX } from "react";

import { formatPhoneKR } from "@shared/lib/formatters";

type PhoneInputProps = {
  /** 숫자만 (예: "01012345678") */
  value: string;
  /** 숫자만 전달 (예: "01012345678") */
  onChange: (digitsOnly: string) => void;
  placeholder?: string;
} & Omit<JSX.IntrinsicElements["input"], "value" | "onChange">;

const digitsOnly = (s: string) => s.replace(/\D/g, "").slice(0, 11);

export function PhoneInput({
  value,
  onChange,
  placeholder = "010-1234-5678",
  ...rest
}: Readonly<PhoneInputProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(digitsOnly(e.target.value));
  };

  return (
    <input
      value={formatPhoneKR(value)}
      onChange={handleChange}
      inputMode="numeric"
      autoComplete="tel"
      placeholder={placeholder}
      {...rest}
    />
  );
}
