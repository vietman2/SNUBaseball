import {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

import { FileSelectContext } from "./useFileSelect";
import { uploadReducer } from "../reducers/uploadReducer";

interface Props {
  children: ReactNode;
}

const MAX_FILES = 30;

export function FileSelectProvider({ children }: Readonly<Props>) {
  const [fileObjs, dispatch] = useReducer(uploadReducer, []);
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
      if (accepted.length)
        dispatch({
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

  const setProgress = useCallback((id: string, percent: number) => {
    dispatch({ type: "PROGRESS", id, percent });
  }, []);

  const overallProgress = useMemo(() => {
    if (fileObjs.length === 0) return 0;
    const sum = fileObjs.reduce((acc, f) => acc + f.progress, 0);
    return Math.round(sum / fileObjs.length);
  }, [fileObjs]);

  const setError = useCallback((id: string, msg: string) => {
    dispatch({ type: "SET_STATUS", id, status: "ERROR", errorMsg: msg });
  }, []);

  const setDone = useCallback((id: string) => {
    dispatch({ type: "SET_STATUS", id, status: "DONE", errorMsg: null });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const value = useMemo(
    () => ({
      fileObjs,
      addFiles,
      removeFile,
      setProgress,
      setDone,
      setError,
      overallProgress,
      clear,
    }),
    [
      fileObjs,
      addFiles,
      removeFile,
      overallProgress,
      setProgress,
      setError,
      setDone,
      clear,
    ]
  );

  return (
    <FileSelectContext.Provider value={value}>
      {children}
    </FileSelectContext.Provider>
  );
}
