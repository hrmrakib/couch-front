import { getCurrentUser } from "@/service/authService";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  // Fetch current user (authentication token)
  const token = await getCurrentUser();

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: [
    "/my-account",
    "/workoutplan1/:page",
    "/nutritionplan1",
    "/nutritionplan1/:page",
    "/workoutplan1",
    "/about1",
    "/myworkoutplan",
    "/myworkoutplan/:page",
    "/appointment",
    "/appointment/:page",
    "/profile",
    "/myappointment",
  ],
};
