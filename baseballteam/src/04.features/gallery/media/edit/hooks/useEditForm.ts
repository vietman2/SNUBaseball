import { useEffect, useMemo, useState } from "react";

import { useEditMediaAPI } from "../api/editMedia";
import { useAlbums, type AlbumType } from "@entities/gallery/album";
import type { MediaType } from "@entities/gallery/media";
import { useTags, type MediaTagType } from "@entities/gallery/tags";

type Options = {
  media: MediaType;
  closeMedia: () => void;
};

function unorderedEqualById<A extends { id: string | number }>(a: A[], b: A[]) {
  if (a.length !== b.length) return false;
  const bSet = new Set(b.map((x) => x.id));
  for (const element of a) {
    if (!bSet.has(element.id)) return false;
  }
  return true;
}

export function useEditForm({ media, closeMedia }: Readonly<Options>) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>([]);

  const { mutateAsync: updateMedia, isPending } = useEditMediaAPI(
    media.id,
    media.type
  );
  const { albums } = useAlbums();
  const { tags } = useTags();

  const selectAlbum = (album: AlbumType | null) => {
    setSelectedAlbum(album);
  };

  const selectTag = (tag: MediaTagType) => {
    if (selectedTags.find((t) => t.id === tag.id)) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const isButtonDisabled = useMemo(() => {
    // 1) 선택 앨범 없음 or 요청중이면 비활성
    if (!selectedAlbum || isPending) return true;

    // 2) 앨범이 바뀌었으면 활성
    if (selectedAlbum.id !== media.album.id) return false;

    // 3) 태그 집합이 완전히 같으면 비활성, 다르면 활성
    return unorderedEqualById(selectedTags, media.tags);
  }, [selectedAlbum, selectedTags, media, isPending]);

  const submit = async () => {
    // 버튼이 비활성화 되어있기 때문에, 여기서 validation 처리를 할 필요가 없음.
    const tagIds = selectedTags.map((tag) => tag.id);

    const res = await updateMedia({
      album_id: selectedAlbum!.id,
      tag_ids: tagIds,
    });

    if (res.status === "SUCCESS") {
      closeMedia();
    } else {
      window.alert(res.message);
    }
  };

  useEffect(() => {
    const album = albums.find((album) => album.id === media.album.id);
    setSelectedAlbum(album || null);
    setSelectedTags(media.tags);
  }, [media, albums]);

  return {
    albums,
    tags,
    selectedAlbum,
    selectAlbum,
    selectedTags,
    selectTag,
    submit,
    isButtonDisabled,
  };
}
