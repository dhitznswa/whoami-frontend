import UserMessages from "@/app/(main)/dashboard/user-messages";
import WelcomeBanner from "@/app/(main)/dashboard/welcome-banner";

export default function page() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/4">
        <WelcomeBanner />
      </div>
      <div className="w-full md:w-3/4">
        <UserMessages />
      </div>
    </div>
  );
}
