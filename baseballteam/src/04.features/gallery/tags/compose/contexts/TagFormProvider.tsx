import { useCallback, useMemo, useState, type ReactNode } from "react";

import { TagFormContext } from "./useTagForm";
import type { MediaTagType } from "@entities/gallery/tags";

interface Props {
  children: ReactNode;
  initialTag?: MediaTagType;
}

export function TagFormProvider({ children, initialTag }: Readonly<Props>) {
  const [name, setName] = useState<string>(initialTag?.name ?? "태그 이름");
  const [color, setColor] = useState<string>(initialTag?.color ?? "#123456");
  const [icon, setIcon] = useState<string>(initialTag?.icon ?? "hashtag");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const resetForm = useCallback(() => {
    setName("태그 이름");
    setColor("#123456");
    setIcon("hashtag");
  }, []);

  // 변경사항이 있는지 + 이름이 최소 1글자 이상인지
  const isReady = useMemo(() => {
    // 이름은 최소 1글자 이상
    if (!name || name.trim().length === 0) return false;
    if (!initialTag) return true;
    return (
      name !== initialTag.name ||
      color !== initialTag.color ||
      icon !== initialTag.icon
    );
  }, [name, color, icon, initialTag]);

  const payload = useMemo(() => {
    return { name, color, icon };
  }, [name, color, icon]);

  const value = useMemo(
    () => ({
      name,
      setName,
      color,
      setColor,
      icon,
      setIcon,
      errorMsg,
      setErrorMsg,
      resetForm,
      payload,
      isReady,
    }),
    [name, color, icon, errorMsg, payload, resetForm, isReady]
  );

  return (
    <TagFormContext.Provider value={value}>{children}</TagFormContext.Provider>
  );
}
