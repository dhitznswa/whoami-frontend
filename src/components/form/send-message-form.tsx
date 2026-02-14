"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const messageSchema = z.object({
  content: z.string().min(5).max(100),
});

export default function SendMessageForm({ username }: { username: string }) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  return (
    <Card className="shadow-md bg-linear-to-br from-primary via-slate-400 via-40% to-primary">
      <CardContent>
        <form action="">
          <FieldGroup>
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="-space-y-2" data-invalid={fieldState.invalid}>
                  <InputGroup className="bg-white">
                    <InputGroupTextarea
                      {...field}
                      id="message"
                      placeholder="Tulis pesan disini"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length > 100 ? (
                          <span className="text-red-500">
                            -{field.value.length - 100} characters
                          </span>
                        ) : (
                          <span>{field.value.length}/100 characters</span>
                        )}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Kirim Pesan</Button>
      </CardFooter>
    </Card>
  );
}
