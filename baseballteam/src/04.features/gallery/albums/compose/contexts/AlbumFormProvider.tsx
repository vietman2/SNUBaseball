import { useCallback, useMemo, useState, type ReactNode } from "react";

import { AlbumFormContext } from "./useAlbumForm";
import type { AlbumType } from "@entities/gallery/album";

interface Props {
  children: ReactNode;
  initialAlbum?: AlbumType; // 전달되면 수정모드, 그렇지 않으면 생성모드
}

export function AlbumFormProvider({ children, initialAlbum }: Readonly<Props>) {
  const [title, setTitle] = useState<string>(
    initialAlbum?.title ?? "앨범 제목"
  );
  const [membersOnly, setMembersOnly] = useState<boolean>(
    initialAlbum?.members_only ?? false
  );
  const [color, setColor] = useState<string>(initialAlbum?.color ?? "#123456");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const toggle = useCallback(() => {
    setMembersOnly((prev) => !prev);
  }, []);

  const resetForm = useCallback(() => {
    setTitle("앨범 제목");
    setMembersOnly(false);
    setColor("#123456");
  }, []);

  // 변경사항이 있는지 + 제목이 최소 1글자 이상인지
  const isReady = useMemo(() => {
    // 제목은 최소 1글자 이상
    if (!title || title.trim().length === 0) return false;
    if (!initialAlbum) return true;
    return (
      title !== initialAlbum.title ||
      membersOnly !== initialAlbum.members_only ||
      color !== initialAlbum.color
    );
  }, [title, membersOnly, color, initialAlbum]);

  const payload = useMemo(() => {
    return { title, members_only: membersOnly, color };
  }, [title, membersOnly, color]);

  const value = useMemo(
    () => ({
      title,
      setTitle,
      membersOnly,
      toggleMembersOnly: toggle,
      color,
      setColor,
      errorMsg,
      setErrorMsg,
      resetForm,
      payload,
      isReady,
    }),
    [title, membersOnly, color, errorMsg, payload, resetForm, isReady, toggle]
  );

  return (
    <AlbumFormContext.Provider value={value}>
      {children}
    </AlbumFormContext.Provider>
  );
}
