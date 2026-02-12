"use client";

import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import api from "@/lib/axios";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MessageTypes = {
  id: string;
  content: string;
  name?: string;
  senderIp: string;
  createdAt: string;
  updatedAt: string;
};

export default function ListMessages({ username }: { username: string }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [`messages-${username}`],
    queryFn: async () => {
      const { data: res, status } = await api.get(`/messages/${username}`);
      if (status !== 200) throw new Error("Gagal mengambil pesan");

      return res.data;
    },
  });

  if (isPending) {
    return (
      <p className="text-sm text-muted-foreground">Memuat pesan masuk...</p>
    );
  }

  if (isError) {
    return (
      <>
        <p className="text-sm text-muted-foreground mb-2">
          Gagal mendapatkan pesan
        </p>
        <Button size="xs" onClick={() => refetch()}>
          Coba lagi
        </Button>
      </>
    );
  }

  return (
    <div className="space-y-3">
      {data.length < 1 ? (
        <p className="text-sm text-muted-foreground">
          Belum ada pesan nih. ayo bagikan link kamu untuk mendapatkan pesan.
        </p>
      ) : (
        data.map((message: MessageTypes) => (
          <CardMessage key={message.id} message={message} />
        ))
      )}
    </div>
  );
}

function CardMessage({ message }: { message: MessageTypes }) {
  const senderName =
    message.name === null || message.name === "" ? "Anonymouse" : message.name;

  return (
    <div>
      <Card className="rounded-sm">
        <CardContent>
          <Badge>{senderName}</Badge>
          <p className="text-sm mt-3">{message.content}</p>
        </CardContent>
      </Card>
      <div className="text-xs ml-2 mt-1">
        <p className=" text-muted-foreground">
          {format(message.createdAt, "dd MMM yyyy - HH:mm")}
        </p>
      </div>
    </div>
  );
}
