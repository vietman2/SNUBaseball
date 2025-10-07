import { useDeleteTagAPI } from "../api/deleteTag";
import type { MediaTagType } from "@entities/gallery/tags";
import { DeleteButton } from "@shared/ui/Buttons";

interface Props {
  tag: MediaTagType;
}

export function DeleteTagButton({ tag }: Readonly<Props>) {
  const { mutateAsync: deleteTag, isPending } = useDeleteTagAPI();

  const onDelete = async () => {
    if (isPending) return;

    const totalMedia = tag.num_images + tag.num_videos;

    const confirmed =
      totalMedia > 0
        ? window.confirm(
            `"${tag.name}" 태그에는 ${totalMedia}개의 사진/영상이 연결되어 있습니다. 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
          )
        : true;

    if (confirmed) {
      const res = await deleteTag(tag.id);

      if (res.status === "SUCCESS") {
        window.alert("태그가 성공적으로 삭제되었습니다.");
      } else {
        window.alert(res.message);
      }
    }
  };

  return (
    <DeleteButton onClick={onDelete} label="" testID={`delete-tag-${tag.id}`} />
  );
}
