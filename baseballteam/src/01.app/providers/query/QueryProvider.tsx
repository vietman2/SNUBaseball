import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@shared/config/query";

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Readonly<Props>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
