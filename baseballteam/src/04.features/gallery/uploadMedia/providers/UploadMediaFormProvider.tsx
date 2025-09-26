import { useCallback, useMemo, useReducer, useRef, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { completeUpload } from "../api/complete";
import { uploadSingleMedia } from "../api/uploadSingleMedia";
import { UploadMediaFormContext } from "../contexts/useUploadMediaForm";
import type { RequestItemType } from "../models/api.types";
import { useMediaSelects } from "@entities/gallery";
import { uploadReducer } from "@shared/lib/files";

interface Props {
  children: ReactNode;
  postUpload: () => void;
}

const MAX_FILES = 30;

export function UploadMediaFormProvider({
  children,
  postUpload,
}: Readonly<Props>) {
  const [fileObjs, dispatch] = useReducer(uploadReducer, []);
  const { payload } = useMediaSelects();
  const queryClient = useQueryClient();
  const idRef = useRef<number>(0);
  const nextId = () => String(++idRef.current);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const incoming = Array.from(list);

      const remaining = MAX_FILES - fileObjs.length;
      if (remaining <= 0) {
        window.alert(`최대 ${MAX_FILES}개까지 업로드할 수 있습니다.`);
        return;
      }

      const sig = (f: File) => `${f.name}-${f.size}`;
      const seen = new Set(fileObjs.map((it) => sig(it.file)));

      const unique = incoming.filter((f) => {
        const s = sig(f);
        if (seen.has(s)) return false;
        seen.add(s);
        return true;
      });

      const accepted = unique.slice(0, remaining);
      if (unique.length > remaining) {
        window.alert(`최대 ${MAX_FILES}개까지 업로드할 수 있습니다.`);
      }
      if (accepted.length) dispatch({
        type: "ADD",
        items: accepted.map((file) => ({
          id: nextId(),
          file,
          status: "PENDING" as const,
          progress: 0,
          errorMsg: null,
        })),
      });
    },
    [fileObjs]
  );

  const removeFile = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const overallProgress = useMemo(() => {
    if (fileObjs.length === 0) return 0;
    const sum = fileObjs.reduce((acc, f) => acc + (f.progress), 0);
    return Math.round(sum / fileObjs.length);
  }, [fileObjs]);

  const isReady = useMemo(() => {
    // 파일이 최소 1개 있고, payload 중 앨범이 null이 아니어야 하며,
    // progress가 0%여야 함
    return (
      fileObjs.length > 0 && payload.album !== null && overallProgress === 0
    );
  }, [fileObjs, payload, overallProgress]);

  const submit = useCallback(async () => {
    if (!payload.album) return;

    const okItems: RequestItemType[] = [];
    const uploadedIds: string[] = [];
    let hasError = false;

    // 병렬로 올리고 싶다면 Promise.all로 바꿔도 됨(동시성 고려)
    for (const item of fileObjs) {
      try {
        const res = await uploadSingleMedia(payload.album.id, item.file, (p) =>
          dispatch({ type: "PROGRESS", id: item.id, percent: p })
        );
        if (!res) {
          hasError = true;
          dispatch({
            type: "SET_STATUS",
            id: item.id,
            status: "ERROR",
            errorMsg: "Presign/업로드 실패",
          });
          continue;
        }
        okItems.push(res.data);
        uploadedIds.push(item.id);
      } catch {
        hasError = true;
        dispatch({ type: "SET_STATUS", id: item.id, status: "ERROR" });
      }
    }

    if (okItems.length === 0) hasError = true; // 하나도 성공 못했으면 종료

    // complete
    const done = await completeUpload(
      payload.album.id,
      payload.tags.map((t) => t.id),
      okItems
    );

    if (!done) {
      // complete 실패 → 업로드된 항목들만 ERROR 처리(또는 멈춰두기)
      for (const id of uploadedIds) {
        dispatch({
          type: "SET_STATUS",
          id,
          status: "ERROR",
          errorMsg: "서버 완료 처리 실패",
        });
      }
      hasError = true;
    } else {
      // complete 성공 → 해당 항목들 100% & DONE
      for (const id of uploadedIds) {
        dispatch({ type: "PROGRESS", id, percent: 100 });
        dispatch({ type: "SET_STATUS", id, status: "DONE" });
      }
    }

    if (hasError) return; // 에러 났으면 여기서 종료

    // 앨범 리프레시 후 초기화
    await queryClient.invalidateQueries({
      queryKey: ["albums", payload.album.id],
    });
    dispatch({ type: "CLEAR" });
    postUpload();
  }, [fileObjs, payload, postUpload, queryClient]);

  const value = useMemo(() => {
    return {
      fileObjs,
      addFiles,
      removeFile,
      submit,
      isReady,
      progress: overallProgress,
    };
  }, [fileObjs, addFiles, removeFile, submit, isReady, overallProgress]);

  return (
    <UploadMediaFormContext.Provider value={value}>
      {children}
    </UploadMediaFormContext.Provider>
  );
}
