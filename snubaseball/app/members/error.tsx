"use client";

import { ErrorPage } from "@widgets/error";

export default function MembersError({ error }: Readonly<{ error: Error }>) {
  const reset = () => {
    // reload the page
    window.location.reload();
  };

  return <ErrorPage error={error} reset={reset} />;
}
