"use client";

import ListMessages from "@/components/list-messages";
import { useSession } from "@/store/useAuthStore";

export default function UserMessages() {
  const { session, isLoading } = useSession();

  return (
    <>
      <h2 className="font-bold">Pesan Masuk</h2>
      <div className="w-full mt-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Memuat pesan masuk...</p>
        ) : (
          session && <ListMessages username={session?.username} />
        )}
      </div>
    </>
  );
}
