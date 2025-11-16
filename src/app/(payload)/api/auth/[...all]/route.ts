import { toNextJsHandler } from "better-auth/next-js";
import { handler } from "@/shared/model/auth";

export const { GET, POST } = toNextJsHandler(handler);
