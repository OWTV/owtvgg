"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { Session } from "./types";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
	children,
	session,
}: {
	children: ReactNode;
	session: Session | null;
}) {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
}

export function useSession() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}

	return context;
}
