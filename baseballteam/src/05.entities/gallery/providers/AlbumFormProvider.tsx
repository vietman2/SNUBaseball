import { useMemo, useState, type ReactNode } from "react";

import { AlbumFormContext } from "../contexts/useAlbumForm";

interface Props {
  children: ReactNode;
  initialTitle?: string;
  initialMembersOnly?: boolean;
}

export function AlbumFormProvider({
  children,
  initialTitle = "",
  initialMembersOnly = false,
}: Readonly<Props>) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [membersOnly, setMembersOnly] = useState<boolean>(initialMembersOnly);

  // 변경사항이 있는지 + 제목이 최소 1글자 이상인지
  const isUpdated = useMemo(() => {
    return (
      (title !== initialTitle || membersOnly !== initialMembersOnly) &&
      title.trim().length > 0
    );
  }, [title, membersOnly, initialTitle, initialMembersOnly]);

  const payload = useMemo(() => {
    return { title, members_only: membersOnly };
  }, [title, membersOnly]);

  const value = useMemo(
    () => ({
      title,
      setTitle,
      membersOnly,
      setMembersOnly,
      payload,
      isUpdated,
    }),
    [title, membersOnly, payload, isUpdated]
  );

  return (
    <AlbumFormContext.Provider value={value}>
      {children}
    </AlbumFormContext.Provider>
  );
}
