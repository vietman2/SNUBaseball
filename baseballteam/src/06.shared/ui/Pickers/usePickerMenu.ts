import { useEffect, useRef, useState } from "react";

/**
 * Menu 열기/닫기 훅
 * - 메뉴 외부 클릭 시 닫기
 * - ESC 키 입력 시 닫기
 * - 메뉴 열기 시 검색창에 포커스
 * @returns { rootRef, menuOpen, openMenu, closeMenu }
 */

export function usePickerMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const open = () => setMenuOpen(true);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleDown = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && !el.contains(target)) close();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("pointerdown", handleDown, true);
    document.addEventListener("keydown", handleKey, true);

    return () => {
      document.removeEventListener("pointerdown", handleDown, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [menuOpen]);

  return { rootRef, menuOpen, openMenu: open, closeMenu: close };
}
