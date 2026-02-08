"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type MessageTypes = {
  id: string;
  content: string;
  name?: string;
  senderIp: string;
  createdAt: string;
  updatedAt: string;
};

export default function ListMessages({ username }: { username: string }) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [`messages-${username}`],
    queryFn: async () => {
      const { data: res, status } = await api.get(`/messages/${username}`);
      if (status !== 200) throw new Error("Gagal mengambil pesan");

      return res.data;
    },
  });

  if (isPending) {
    return <p>Memuat pesan...</p>;
  }

  if (isError) {
    return (
      <>
        <p>{error.message}</p>
        <Button size="xs" onClick={() => refetch()}>
          Coba lagi
        </Button>
      </>
    );
  }

  console.log(data);

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map((message: MessageTypes) => (
        <CardMessage key={message.id} message={message} />
      ))}
    </div>
  );
}

function CardMessage({ message }: { message: MessageTypes }) {
  return (
    <Card>
      <CardContent>{message.content}</CardContent>
    </Card>
  );
}
