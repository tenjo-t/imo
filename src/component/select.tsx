import { ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { useId } from "react";
import { Label } from "./label";

type Props = {
	label: string;
	name: string;
	required?: boolean;
	children?: ReactNode;
};

export function Select({ label, name, required, children }: Props) {
	const id = useId();

	return (
		<div>
			<Label className="block" htmlFor={id}>
				{label}
				{required && " *"}
			</Label>
			<div className="relative w-fit">
				<select
					className="block pl-2 pr-10 py-1 bg-slate-100 border border-slate-300 rounded appearance-none after:block after:absolute after:content-['']"
					id={id}
					name={name}
				>
					{children}
				</select>
				<ChevronsUpDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700" />
			</div>
		</div>
	);
}
