import api from "@/lib/axios";
import { AxiosError } from "axios";

export async function getSession() {
  try {
    const res = await api.post("/auth/session");

    if (res.status !== 200) return null;

    return res.data.data;
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status == 401) return null;
    throw err;
  }
}
