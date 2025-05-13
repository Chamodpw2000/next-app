import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";

export default middleware;

// Make sure the matcher pattern is correct
export const config = {
  matcher: ['/users/:id*']
}




