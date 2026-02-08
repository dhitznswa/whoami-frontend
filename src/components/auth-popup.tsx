"use client";

import { LoginForm } from "@/components/form/login-form";
import { RegisterForm } from "@/components/form/register-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/store/useAuthStore";
import { ReactNode } from "react";

export default function AuthPopup({ children }: { children: ReactNode }) {
  const { session } = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Tabs defaultValue="login" className="w-full">
        <DialogContent showCloseButton={false}>
          <DialogHeader className="sr-only">
            <DialogTitle>Infolokerhub.com</DialogTitle>
          </DialogHeader>
          {session ? null : (
            <>
              <TabsList className="mx-auto w-[80%]">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </>
          )}
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}
