"use client";

import { ErrorPage } from "@widgets/error";

export default function GalleryError({ error }: Readonly<{ error: Error }>) {
  const reset = () => {
    // reload the page
    window.location.reload();
  };

  return <ErrorPage error={error} reset={reset} />;
}
