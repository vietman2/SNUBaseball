import type { MediaTagType } from "../models/tags";
import { useColors } from "@shared/lib/styles";
import { SimpleBadge } from "@shared/ui/Badges";
import { Skeleton } from "@shared/ui/Loading";

interface Props {
  tag: MediaTagType;
  isActive?: boolean;
}

export function TagBadge({ tag, isActive = false }: Readonly<Props>) {
  const { colors } = useColors();

  return (
    <SimpleBadge
      label={tag.name}
      icon={tag.icon}
      color={isActive ? tag.color : colors.gray500}
    />
  );
}

export function TagBadgeSkeleton() {
  return <Skeleton width={60} height={24} borderRadius={12} />;
}
