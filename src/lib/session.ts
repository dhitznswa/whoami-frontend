import api from "@/lib/axios";

export async function getSession() {
  const res = await api.post("/auth/session");

  if (res.status !== 200) return null;

  return res.data.data;
}
