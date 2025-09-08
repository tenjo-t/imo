import { useId } from "react";
import { Label } from "./label";

type Props = {
	label: string;
	name: string;
	required?: boolean;
};

export function Text({ label, name, required }: Props) {
	const id = useId();

	return (
		<div>
			<Label className="block text-gray-700 text-sm" htmlFor={id}>
				{label}
				{required && " *"}
			</Label>
			<input
				className="block px-2 py-1 bg-slate-100 border border-slate-300 rounded focus:border-amber-300"
				type="text"
				id={id}
				name={name}
				required={required}
			/>
		</div>
	);
}
