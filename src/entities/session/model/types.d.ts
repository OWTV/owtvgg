import type { auth } from "@/shared/model";

export type Session = Awaited<ReturnType<typeof auth.getSession>>;
