import { useEffect, useRef, useState } from "react";

export function useMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const openMenu = () => {
    setMenuOpen(true);
    setTimeout(() => searchRef.current?.focus(), 0);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleDown = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && !el.contains(target)) closeMenu();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("pointerdown", handleDown, true);
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("pointerdown", handleDown, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [menuOpen]);

  return { rootRef, menuOpen, openMenu, closeMenu, };
}
