"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function AuthPopup({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Tabs defaultValue="login" className="w-full">
        <DialogContent showCloseButton={false}>
          <DialogHeader className="sr-only">
            <DialogTitle>Infolokerhub.com</DialogTitle>
          </DialogHeader>
          <TabsList className="mx-auto w-[80%]">
            <TabsTrigger value="login">Masuk</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <AuthLogin />
          </TabsContent>
          <TabsContent value="register">
            <AuthRegister />
          </TabsContent>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}

function AuthLogin() {
  return <>Login</>;
}

const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Nama minimal 3 huruf" }),
    username: z.string().min(5, { message: "Username minimal 5 karakter" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
    confirm_password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Tidak sama dengan password",
    path: ["confirm_password"],
  });

function AuthRegister() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const { data: response } = await api.post("/auth/register", data);

    if (response.statusCode) {
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="form-register"
      className="mt-4"
    >
      <FieldGroup className="-space-y-2 ">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="-space-y-2" data-invalid={fieldState.invalid}>
              <Input
                className="placeholder:text-sm text-sm"
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Masukan nama"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-sm -mb-2"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="-space-y-2" data-invalid={fieldState.invalid}>
              <Input
                className="placeholder:text-sm text-sm"
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
                placeholder="Masukan username"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-sm -mb-2"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="-space-y-2" data-invalid={fieldState.invalid}>
              <Input
                className="placeholder:text-sm text-sm"
                {...field}
                type="password"
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Masukan password"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-sm -mb-2"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="-space-y-2" data-invalid={fieldState.invalid}>
              <Input
                className="placeholder:text-sm text-sm"
                {...field}
                type="password"
                id="confirm_password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm passowrd"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-sm -mb-2"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Field orientation="horizontal" className="mt-5">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-register">
          Submit
        </Button>
      </Field>
    </form>
  );
}
