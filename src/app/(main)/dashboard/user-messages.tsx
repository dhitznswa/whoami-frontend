"use client";

import ListMessages from "@/components/list-messages";
import { useSession } from "@/store/useAuthStore";

export default function UserMessages() {
  const { session } = useSession();

  return (
    <>
      <h2 className="font-bold">Pesan Masuk</h2>
      <div className="w-full mt-4">
        {session && <ListMessages username={session?.username} />}
      </div>
    </>
  );
}
