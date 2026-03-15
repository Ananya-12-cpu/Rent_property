"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { StoreProvider } from "@/store/StoreProvider";
import { Notification } from "@/components/ui/Notification";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Notification />
      </QueryClientProvider>
    </StoreProvider>
  );
}
