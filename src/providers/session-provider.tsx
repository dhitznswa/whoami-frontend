"use client";

import { getSession } from "@/lib/session";
import { useSession } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSession((s) => s.setSession);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      setSession(session);
    }

    fetchData();
  }, [setSession, pathname]);

  return <>{children}</>;
}
