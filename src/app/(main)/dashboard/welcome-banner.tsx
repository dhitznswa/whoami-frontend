"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSession } from "@/store/useAuthStore";
import { Check, Copy } from "lucide-react";

export default function WelcomeBanner() {
  const { session } = useSession();
  const { copy, isCopied } = useCopyToClipboard();

  const linkPublicMessage = `${window.location.origin}/s/@${session?.username}`;
  return (
    <Card>
      <CardContent>
        <h1 className="text-xl font-bold">
          Halo, <br />{" "}
          <span className="text-primary line-clamp-1">{session?.name}</span>
        </h1>
        <div className="mt-5">
          <div className="">
            <InputGroup className="border border-primary">
              <InputGroupInput
                value={linkPublicMessage}
                readOnly
                className="text-xs"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Copy"
                  title="Copy"
                  size="icon-xs"
                  onClick={() => {
                    copy(
                      `Yuk kirim pesan ke aku tanpa ketahuan!\n${linkPublicMessage}`
                    );
                  }}
                >
                  {isCopied ? <Check /> : <Copy />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <p className="text-xs text-muted-foreground mt-2">
              * Bagikan link ini untuk menerima pesan
            </p>
          </div>
          <div className="mt-3 space-y-2">
            <Button className="w-full text-xs bg-green-600 text-white">
              Share to WhatsApp
            </Button>
            <Button className="w-full text-xs bg-linear-to-br from-purple-600 via-50% via-pink-600 to-red-600 text-white">
              Share to Instagram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
