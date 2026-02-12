"use client";

import AuthPopup from "@/components/auth-popup";
import { Button } from "@/components/ui/button";
import { useSession } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function WelcomeJumbotron() {
  const router = useRouter();
  const { session, isLoading } = useSession();

  return (
    <div className="w-full h-dvh flex justify-center items-center p-4">
      <div className="max-w-3xl text-center space-y-4 md:space-y-6">
        <h1 className="font-bungee text-4xl md:text-6xl text-primary">
          Whoam!
        </h1>
        <p className="text-lg md:text-2xl font-semibold">
          Buat Halaman dan Dapatkan <br /> Pesan Rahasia dari Teman mu
        </p>
        {isLoading ? (
          <p>Memuat data..</p>
        ) : session ? (
          <Button onClick={() => router.push("/dashboard/?isLogin=true")}>
            Masuk Dashboard
          </Button>
        ) : (
          <AuthPopup>
            <Button>Mulai Sekarang</Button>
          </AuthPopup>
        )}
      </div>
    </div>
  );
}
