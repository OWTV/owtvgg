import type { BasePayload } from "payload";
import type { BetterAuthReturn } from "payload-auth/better-auth";
import { payload } from "../payload";

export type Payload = BasePayload & {
	betterAuth: BetterAuthReturn;
};

export const { api: auth, handler } = (payload as Payload).betterAuth;
