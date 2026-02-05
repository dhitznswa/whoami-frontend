import AuthPopup from "@/components/auth-popup";
import { Button } from "@/components/ui/button";

export default function WelcomeJumbotron() {
  return (
    <div className="w-full h-dvh flex justify-center items-center p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="font-bungee text-6xl text-primary">Whoami!</h1>
        <p className="text-2xl font-semibold">
          Curhat, Confess, atau sekedar iseng.
          <br />
          Semua masuk tanpa identitas.
        </p>
        <AuthPopup>
          <Button>Mulai Sekarang</Button>
        </AuthPopup>
      </div>
    </div>
  );
}
