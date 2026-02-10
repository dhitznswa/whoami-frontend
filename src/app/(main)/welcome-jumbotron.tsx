import AuthPopup from "@/components/auth-popup";
import { Button } from "@/components/ui/button";

export default function WelcomeJumbotron() {
  return (
    <div className="w-full h-dvh flex justify-center items-center p-4">
      <div className="max-w-3xl text-center space-y-4 md:space-y-6">
        <h1 className="font-bungee text-4xl md:text-6xl text-primary">
          Whoam!
        </h1>
        <p className="text-lg md:text-2xl font-semibold">
          Buat Halaman dan Dapatkan <br /> Pesan Rahasia dari Teman mu
        </p>
        <AuthPopup>
          <Button>Mulai Sekarang</Button>
        </AuthPopup>
      </div>
    </div>
  );
}
