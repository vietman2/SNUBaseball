import { useEffect, useState } from "react";

export const useOrientation = () => {
  const getOrientation = () =>
    window.matchMedia("(orientation: portrait)").matches ? 2 : 1;

  const [orientation, setOrientation] = useState<1 | 2>(getOrientation());

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");

    // Add listener for orientation changes
    mediaQuery.addEventListener("change", handleOrientationChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return orientation;
};
