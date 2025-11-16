import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import type { Session } from "@/entities/session";
import { LogInButton } from "@/features/user-log-in";
import { LogOutButton } from "@/features/user-log-out";
import { SignUpModal } from "@/features/user-sign-up";
import { Avatar } from "@/shared/ui/avatar";

export function Navbar({ session }: { session: Session }) {
	return (
		<nav className="container flex items-center justify-between py-2">
			<div className="flex items-center gap-2">
				<Link href={"/"} className="text-2xl font-bold">
					OWTV.gg
				</Link>
				{session && <Link href={"/admin"}>Admin</Link>}
				{session && <Link href={"/teams"}>Teams</Link>}
			</div>
			<div className="flex items-center gap-2">
				<AuthButtons session={session} />
				{session && <UserAvatar session={session} />}
			</div>
		</nav>
	);
}

function AuthButtons({ session }: { session: Session }) {
	return (
		<div className="flex items-center gap-2">
			{session ? (
				<LogOutButton />
			) : (
				<>
					<LogInButton>Log In</LogInButton>
					<SignUpModal variant={"outline"}>Sign Up</SignUpModal>
				</>
			)}
		</div>
	);
}

function UserAvatar({ session }: { session: Session }) {
	if (!session) return null;

	return (
		<div className="flex items-center gap-4">
			<Avatar className="items-center">
				<AvatarImage src={session.user.image ?? ""} />
				<AvatarFallback>
					{session.user.name?.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	);
}
