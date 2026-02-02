"use client";

import { getSession } from "@/lib/session";
import { useSession } from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSession((s) => s.setSession);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      setSession(session);
    }

    fetchData();
  }, [setSession]);

  return <>{children}</>;
}
