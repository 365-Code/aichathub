import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUser } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {

  const path = new URL(request.url).pathname
  const protectedRoutes = ["/protected", "/converse", "/chat"]
  const authRoutes = ["/login"]

  const isProtectedRotue = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if( isProtectedRotue || isAuthRoute ){
    const user = await getUser()
    if(isProtectedRotue && !user){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if(isAuthRoute && user){
      return NextResponse.redirect(new URL('/', request.url))
    }

  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
