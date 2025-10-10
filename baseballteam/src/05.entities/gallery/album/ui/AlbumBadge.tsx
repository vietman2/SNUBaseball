import type { AlbumType } from "../models/album";
import { SimpleBadge } from "@shared/ui/Badges";

interface Props {
  album: AlbumType;
}

export function AlbumBadge({ album }: Readonly<Props>) {
  return (
    <SimpleBadge
      label={album.title}
      color={album.color}
      backgroundOpacity={40}
    />
  );
}
