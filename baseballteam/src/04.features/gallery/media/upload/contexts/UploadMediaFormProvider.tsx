import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { UploadMediaFormContext } from "./useUploadMediaForm";
import { completeUpload } from "../api/complete";
import { uploadSingleMedia } from "../api/uploadSingleMedia";
import type { RequestItemType } from "../models/request";
import type { AlbumType } from "@entities/gallery/album";
import type { MediaTagType } from "@entities/gallery/tags";
import { useFileSelect } from "@shared/lib/files";

interface Props {
  children: ReactNode;
  initialAlbum: AlbumType | null;
  initialTags: MediaTagType[];
  postUpload: () => void;
}

export function UploadMediaFormProvider({
  children,
  initialAlbum,
  initialTags,
  postUpload,
}: Readonly<Props>) {
  const { fileObjs, setProgress, setError, setDone, clear, overallProgress } =
    useFileSelect();
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(
    initialAlbum
  );
  const [selectedTags, setSelectedTags] = useState<MediaTagType[]>(initialTags);

  const queryClient = useQueryClient();

  const selectTag = useCallback((tag: MediaTagType) => {
    setSelectedTags((prev) => {
      if (prev.find((t) => t.id === tag.id)) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  const isReady = useMemo(() => {
    // 파일이 최소 1개 있고, payload 중 앨범이 null이 아니어야 하며,
    // progress가 0%여야 함
    return (
      fileObjs.length > 0 && selectedAlbum !== null && overallProgress === 0
    );
  }, [fileObjs, selectedAlbum, overallProgress]);

  const submit = useCallback(async () => {
    if (!selectedAlbum) return;

    const okItems: RequestItemType[] = [];
    const uploadedIds: string[] = [];
    let hasError = false;

    // 병렬로 올리고 싶다면 Promise.all로 바꿔도 됨(동시성 고려)
    for (const item of fileObjs) {
      const res = await uploadSingleMedia(selectedAlbum.id, item.file, (p) =>
        setProgress(item.id, p)
      );
      if (!res) {
        hasError = true;
        setError(item.id, "Presign/업로드 실패");
        continue;
      }
      okItems.push(res.data);
      uploadedIds.push(item.id);
    }

    if (okItems.length === 0) hasError = true; // 하나도 성공 못했으면 종료

    // complete
    const done = await completeUpload(
      selectedAlbum.id,
      selectedTags.map((t) => t.id),
      okItems
    );

    if (!done) {
      // complete 실패 → 업로드된 항목들만 ERROR 처리(또는 멈춰두기)
      for (const id of uploadedIds) {
        setError(id, "서버 완료 처리 실패");
      }
      hasError = true;
    } else {
      // complete 성공 → 해당 항목들 100% & DONE
      for (const id of uploadedIds) {
        setProgress(id, 100);
        setDone(id);
      }
    }

    if (hasError) return; // 에러 났으면 여기서 종료

    // 앨범 리프레시 후 초기화
    await queryClient.invalidateQueries({
      queryKey: ["media"],
    });
    clear();
    postUpload();
  }, [
    fileObjs,
    selectedAlbum,
    postUpload,
    queryClient,
    selectedTags,
    setProgress,
    setError,
    setDone,
    clear,
  ]);

  const value = useMemo(() => {
    return {
      selectedAlbum,
      selectAlbum: setSelectedAlbum,
      selectedTags,
      selectTag,
      submit,
      isReady,
    };
  }, [selectedAlbum, selectedTags, selectTag, submit, isReady]);

  return (
    <UploadMediaFormContext.Provider value={value}>
      {children}
    </UploadMediaFormContext.Provider>
  );
}
