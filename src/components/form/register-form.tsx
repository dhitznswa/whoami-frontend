"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

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

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    try {
      await api.post("/auth/register", data);

      setSuccess("Berhasil daftar, silahkan login");
      form.reset();
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
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
      onSubmit={form.handleSubmit(onSubmit)}
      id="form-register"
      className="mt-4"
    >
      {error && (
        <p className="text-xs text-destructive mb-2 text-center">{error}</p>
      )}
      {success && (
        <p className="text-xs text-green-500 mb-2 text-center">{success}</p>
      )}

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
        <Button type="submit" form="form-register" disabled={loading}>
          {loading ? "Mendaftar..." : "Daftar"}
        </Button>
      </Field>
    </form>
  );
}
