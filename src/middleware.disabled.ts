// Temporarily disable middleware to avoid edge runtime crypto module issue
// TODO: Re-enable once we find an edge-compatible auth solution

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
