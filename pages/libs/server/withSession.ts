import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: "twiiitSession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSesuib(fn: any) {
  return withIronSessionApiRoute(fn, cookieOption);
}