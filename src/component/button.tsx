import type { ButtonHTMLAttributes } from "react";
import type { CVProps } from "../lib/cv.ts";
import { cv } from "../lib/cv.ts";

const variants = cv("block px-4 py-1 rounded transition", {
	variant: {
		default:
			"bg-cyan-800 text-white hover:bg-cyan-900 focus:bg-cyan-900 active:bg-cyan-950",
		secondary:
			"bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-400",
		skeleton: "hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-400",
	},
});

export type Props = CVProps<typeof variants> &
	ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
	return <button {...props} className={variants(props)} />;
}
