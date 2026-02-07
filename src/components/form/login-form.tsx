"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  username: z.string().min(5, { message: "Username minimal 5 karakter" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmitLogin(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      await api.post("/auth/login", data);
      router.replace("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          form.setError("username", {
            type: "server",
            message: err.response.data.message[0],
          });
          setError(err.response.data.message[0]);
          setLoading(false);
          return;
        }
        setError(err.response?.data.message[0]);
        setLoading(false);
        return;
      }
      setError("Something went wrong, try again later");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitLogin)}
      id="form-register"
      className="mt-4"
    >
      {error && (
        <p className="text-xs text-destructive mb-2 text-center">{error}</p>
      )}
      <FieldGroup className="-space-y-2 ">
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
                id="password"
                type="password"
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
      </FieldGroup>
      <Field orientation="horizontal" className="mt-5">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="form-register" disabled={loading}>
          {loading ? "Loading..." : "Masuk"}
        </Button>
      </Field>
    </form>
  );
}
