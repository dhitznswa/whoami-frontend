import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (!accessToken || accessToken.value == "") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { status } = await api.post(
    "/auth/session",
    {},
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  if (status === 401) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
