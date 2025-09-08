import { type ReactNode, useId } from "react";
import { type CVProps, cv } from "../lib/cv";

const variants = cv("", {
	variant: {
		default: "",
		alert: "",
	},
});

type Props = {
	children: ReactNode;
} & CVProps<typeof variants>;

export function Toast(props: Props) {
	const id = useId();
	const role = props.variant === "alert" ? "alert" : "status";

	return (
		<div id={id} role={role} popover="manual">
			<div>
				<p>{props.children}</p>
				<button
					popoverTarget={id}
					popoverTargetAction="hide"
					aria-label="close"
					type="button"
				>
					x
				</button>
			</div>
		</div>
	);
}
