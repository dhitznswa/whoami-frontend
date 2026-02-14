import SendMessageForm from "@/components/form/send-message-form";
import api from "@/lib/axios";
import axios from "axios";
import { notFound } from "next/navigation";

const userExist = async (username: string) => {
  try {
    await api.get(`/users/check-username/${username}`);
    return true;
  } catch (err) {
    if (axios.isAxiosError(err) && err.status === 404) {
      return false;
    }
    console.error("Failed get user : ", err);
  }
};

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const status = await userExist(username);

  if (!status) return notFound();

  return (
    <div className="w-full h-dvh p-4 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <h1 className="text-xl font-bold text-center">
          Ayo Kirim Pesan Rahasia Buat <br />
          <span className="text-3xl text-primary">{username}</span>
        </h1>
        <div className="mt-5">
          <SendMessageForm username={username} />
        </div>
      </div>
    </div>
  );
}
