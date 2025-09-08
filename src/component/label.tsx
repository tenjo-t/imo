import clsx from "clsx";
import type { LabelHTMLAttributes } from "react";

type Props = { htmlFor: string } & LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: Props) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: <>
		<label
			{...props}
			className={clsx(props.className, "block text-slate-700 text-sm")}
		></label>
	);
}
