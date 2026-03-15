"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearNotification } from "@/store/slices/uiSlice";

export function useNotification(autoDismissMs = 3500) {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((s) => s.ui.notification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), autoDismissMs);
    return () => clearTimeout(timer);
  }, [notification, autoDismissMs, dispatch]);

  return { notification, dismiss: () => dispatch(clearNotification()) };
}
