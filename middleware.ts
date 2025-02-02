import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru", "uz", "tr"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return;
    }
    return intlMiddleware(req);
  },
  publicRoutes: [
    "/:lng",
    "/:lng/courses",
    "/:lng/courses/:slug",
    "/:lng/blogs",
    "/:lng/blogs/:slug",
    "/:lng/contacts",
  ],
});

export const config = {
  matcher: ["/((?!api|_next|static|public|favicon.ico).*)"],
};
