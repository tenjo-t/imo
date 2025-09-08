import { mutate } from "@tenjot/react/fetch";
import { CircleAlert, LoaderCircle } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./component/button.tsx";
import { Select } from "./component/select.tsx";
import { Text } from "./component/text.tsx";
import { supabase, useCategory } from "./lib/supabase.ts";

type Props = {
	dialogRef: RefObject<HTMLDialogElement | null>;
};

export function Add({ dialogRef }: Props) {
	const cats = useCategory();
	const [error, setError] = useState<string | null>(null);

	async function action(formData: FormData) {
		const name = formData.get("name")?.toString();
		const category = formData.get("category")?.toString();
		const url = formData.get("url")?.toString();

		if (name == null || name === "" || category == null) {
			return;
		}

		const { error } = await supabase
			.from("wish")
			.insert({ name, category, url });

		if (error != null) {
			setError(error.message);
			return;
		}

		dialogRef.current?.close();
		setError(null);
		mutate(category);
	}

	function close() {
		dialogRef.current?.close();
		setError(null);
	}

	return (
		<dialog
			className="px-8 py-8 m-auto backdrop:bg-slate-950/20 border border-cyan-800 rounded"
			ref={dialogRef}
		>
			<h2 className="pb-8">追加</h2>
			<form className="flex flex-col gap-4" action={action}>
				<Text label="ほしい物" name="name" required />
				<Select label="カテゴリー" name="category" required>
					{cats.map((c) => (
						<option key={c.id} value={c.id}>
							{c.icon} {c.name}
						</option>
					))}
				</Select>
				<Text label="url" name="url" />
				{error && <AlertError>{error}</AlertError>}
				<div className="grid grid-cols-2 gap-4">
					<Button type="button" variant="secondary" onClick={close}>
						キャンセル
					</Button>
					<AddButton />
				</div>
			</form>
		</dialog>
	);
}

function AlertError({ children }: { children: ReactNode }) {
	return (
		<div className="pr-4 pl-2 py-2 bg-rose-200 border border-rose-700 rounded">
			<CircleAlert className="inline-block pr-2 text-rose-700" />
			{children}
		</div>
	);
}

function AddButton() {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} className="flex justify-center gap-2">
			{pending && <LoaderCircle className="p-1 w-6 h-6 animate-spin" />}
			追加
		</Button>
	);
}
