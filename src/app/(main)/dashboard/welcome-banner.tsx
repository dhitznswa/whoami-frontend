"use client";

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

  const linkPublicMessage = `${process.env.BASE_URL}/s/@${session?.username}`;
  return (
    <Card>
      <CardContent>
        <h1 className="text-2xl font-bold">
          Selamat datang, <span className="text-primary">{session?.name}</span>
        </h1>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="">
            <InputGroup className="border border-primary">
              <InputGroupInput
                placeholder={linkPublicMessage}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
