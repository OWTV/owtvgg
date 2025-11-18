import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import "./globals.css";
import { getServerSession, SessionProvider } from "@/entities/session";
import { Toaster } from "@/shared/ui/base";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OWTV",
	description: "The Home of Overwatch Esports.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider session={session}>
					<Navbar session={session} />
					<main className="container pt-16">{children}</main>
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
}
