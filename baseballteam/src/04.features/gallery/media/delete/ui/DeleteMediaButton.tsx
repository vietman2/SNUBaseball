import { useDeleteMediaAPI } from "../api/deleteMedia";
import type { MediaType } from "@entities/gallery/media";
import { DeleteButton } from "@shared/ui/Buttons";

interface Props {
  media: MediaType;
  postDelete: () => void;
}

export function DeleteMediaButton({ media, postDelete }: Readonly<Props>) {
  const { mutateAsync: deleteMedia, isPending } = useDeleteMediaAPI(
    media.id,
    media.type
  );

  const onDelete = async () => {
    if (isPending) return;

    if (
      window.confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      const res = await deleteMedia();

      if (res.status === "SUCCESS") {
        postDelete();
      } else {
        window.alert(res.message);
      }
    }
  };

  return (
    <DeleteButton
      onClick={onDelete}
      label=""
      testID={`delete-button-${media.id}`}
    />
  );
}
