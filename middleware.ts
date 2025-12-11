import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const { data: { user } } = await supabase.auth.getUser();

  const adminEmail = "eiliarhmani1177@gmail.com";

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!user || user.email !== adminEmail) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};