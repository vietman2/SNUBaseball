"use client";

import { useColors } from "@shared/lib/styles";
import { Badge } from "@shared/ui/Badge";

interface Props {
  role: string;
}

export function RoleBadge({ role }: Readonly<Props>) {
  const { colors } = useColors();

  if (role === "선수" || role === "매니저") {
    return null;
  }

  return (
    <div>
      <Badge label={role} color={colors.primary} />
    </div>
  );
}
