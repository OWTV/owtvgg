import { toNextJsHandler } from "better-auth/next-js";
import { handler } from "@/shared/model";

export const { GET, POST } = toNextJsHandler(handler);
