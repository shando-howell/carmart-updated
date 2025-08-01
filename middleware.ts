import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
    // Log routes
    console.log("MIDDLEWARE: ", request.url);

    // Cater for POST request method
    if (request.method === "POST") {
        return NextResponse.next();
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;
    
    const { pathname } = request.nextUrl; 

    if (!token && (
        pathname.startsWith("/login") || 
        pathname.startsWith("/register")) ||
        pathname.startsWith("/vehicles") ||
        pathname.startsWith("forgot-password")
    ) {
        return NextResponse.next();
    }

    if (token && (
        pathname.startsWith("/login") || 
        pathname.startsWith("/register") ||
        pathname.startsWith("/forgot-password")
        )
    ) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    const decodedToken = decodeJwt(token);
    if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
        return NextResponse.redirect(
            new URL(
                `/api/refresh-token?redirect=${encodeURIComponent(
                    request.nextUrl.pathname
                )}`,
                request.url
            )
        );
    }

    if (!decodedToken.admin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (decodedToken.admin && pathname.startsWith("/account/watching")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin-dashboard", 
        "/admin-dashboard/:path*", 
        "/login",
        "/register",
        "/vehicles",
        "/forgot-password",
        "/account",
        "/account/:path*",
    ]
}