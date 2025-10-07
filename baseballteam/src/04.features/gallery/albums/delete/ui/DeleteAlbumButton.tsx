import { useDeleteAlbumAPI } from "../api/deleteAlbum";
import type { AlbumType } from "@entities/gallery/album";
import { DeleteButton } from "@shared/ui/Buttons";

interface Props {
  album: AlbumType;
}

export function DeleteAlbumButton({ album }: Readonly<Props>) {
  const { mutateAsync: deleteAlbum, isPending } = useDeleteAlbumAPI(
    album.title
  );

  const onDelete = async () => {
    if (isPending) return;

    if (album.num_images > 0 || album.num_videos > 0) {
      window.alert("앨범에 사진이나 영상이 포함되어 있어 삭제할 수 없습니다.");
      return;
    }

    const confirmed = window.confirm(
      `"${album.title}" 앨범을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
    );

    if (confirmed) {
      const res = await deleteAlbum();

      if (res.status === "SUCCESS") {
        window.alert(`"${album.title}" 앨범이 삭제되었습니다.`);
      } else {
        window.alert(res.message);
      }
    }
  };

  return <DeleteButton onClick={onDelete} label="" testID={`delete-button-${album.id}`} />;
}
