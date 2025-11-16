import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/shared/model";

export const getServerSession = cache(async () => {
	return await auth.getSession({ headers: await headers() });
});
