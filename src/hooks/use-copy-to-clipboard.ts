"use client";

import { useCallback, useEffect, useState } from "react";

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(resetInterval: number = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy: CopyFn = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      return true;
    } catch (err) {
      console.warn("Failed to copy: ", err);
      setIsCopied(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = setTimeout(() => {
      setIsCopied(false);
    }, resetInterval);
    return () => clearTimeout(timeoutId);
  }, [isCopied, resetInterval]);

  return { copy, isCopied };
}
