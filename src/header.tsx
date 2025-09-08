import { usePosition } from "@tenjot/react/position";
import { LogIn, LogOut } from "lucide-react";
import { type RefObject, useId, useRef } from "react";
import { Add } from "./add";
import { Button } from "./component/button";
import { signIn, signOut, type UserMetadata, useUser } from "./lib/supabase";

export function Header() {
	const user = useUser();
	const dialog = useRef<HTMLDialogElement>(null);

	return (
		<header className="flex gap-4 items-center justify-between">
			<h1 className="text-xl text-cyan-900 font-bold">ほしい物</h1>
			<div>
				<div>{user ? <User user={user} dialog={dialog} /> : <Anonymity />}</div>
			</div>
		</header>
	);
}

function Anonymity() {
	return (
		<Button type="button" className="flex gap-2 items-center" onClick={signIn}>
			<LogIn className="h-5" />
			サインイン
		</Button>
	);
}

function User({
	user,
	dialog,
}: {
	user: UserMetadata;
	dialog: RefObject<HTMLDialogElement | null>;
}) {
	const id = useId();
	const [ref, pos] = usePosition<HTMLButtonElement>();

	return (
		<div className="flex gap-4">
			<button
				type="button"
				className="w-10 h-10 p-1 rounded-full hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-400 transition"
				popoverTarget={id}
				ref={ref}
			>
				<UserIcon user={user} />
			</button>
			<div
				id={id}
				popover=""
				className="fixed p-1 border border-slate-300 rounded-md"
				style={{
					top: pos && pos.bottom + 4,
					left: pos && pos.left - pos.width,
				}}
			>
				<Button
					variant="skeleton"
					type="button"
					className="flex gap-2 items-center"
					onClick={signOut}
				>
					<LogOut className="h-5" />
					サインアウト
				</Button>
			</div>
			<Button onClick={() => dialog.current?.showModal()}>追加</Button>
			<Add dialogRef={dialog} />
		</div>
	);
}

function UserIcon({ user }: { user: UserMetadata }) {
	return user?.avatar_url ? (
		<img
			className="w-8 h-8 rounded-full"
			src={user.avatar_url}
			alt={`${user.user_name} avater`}
		></img>
	) : (
		<div className="h-10 rounded-full border border-slate-300">
			{user?.user_name ?? user?.full_name ?? user?.email}
		</div>
	);
}
