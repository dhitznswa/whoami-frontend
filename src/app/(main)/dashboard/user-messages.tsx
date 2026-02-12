"use client";

import ListMessages from "@/components/list-messages";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useSession } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function UserMessages() {
  const { session, isLoading } = useSession();
  const [delLoading, setDelLoading] = useState(false);
  const queryClient = useQueryClient();

  const onDelete = async () => {
    setDelLoading(true);
    try {
      const { status } = await api.delete("/messages/clear-all");
      if (status === 200) {
        toast.success("Semua pesan dihapus");
        queryClient.invalidateQueries({
          queryKey: [`messages-${session?.username}`],
        });
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Error delete all message : ", err);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold">Pesan Masuk</h2>
        <Button
          variant="destructive"
          size="xs"
          onClick={onDelete}
          disabled={delLoading}
        >
          {delLoading ? "Menghapus ..." : "Hapus Semua"}
        </Button>
      </div>
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
