import type { nextCookies } from "better-auth/next-js";
import type { BasePayload } from "payload";
import type { BetterAuthReturn } from "payload-auth/better-auth";
import { payload } from "../payload";

export type Payload = BasePayload & {
	betterAuth: BetterAuthReturn<Array<ReturnType<typeof nextCookies>>>;
};

export const { api, handler } = (payload as Payload).betterAuth;

export type Session = Awaited<ReturnType<typeof api.getSession>>;
