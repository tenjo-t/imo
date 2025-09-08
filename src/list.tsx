import { useFetch } from "@tenjot/react/fetch";
import { Suspense } from "react";
import { supabase, useCategory } from "./lib/supabase";

export function ImoList() {
	const cats = useCategory();

	return (
		<>
			{cats.map((c) => (
				<Suspense key={c.id} fallback={<ImoFallback />}>
					<ImoCategory {...c} />
				</Suspense>
			))}
		</>
	);
}

type ImoCategoryProps = {
	id: string;
	name: string;
	icon: string;
};

const fetchItems = async (key?: string) => {
	const { data, status, statusText, error } = await supabase
		.from("wish")
		.select("id,name,url,bought")
		.eq("category", key);
	if (error !== null) throw error;
	if (status !== 200) throw statusText;
	console.log(key, data);
	return data;
};

function ImoFallback() {
	return (
		<div className="py-5 animate-pulse">
			<div className="h-10 rounded bg-cyan-800/50 "></div>
		</div>
	);
}

function ImoCategory({ id, name, icon }: ImoCategoryProps) {
	const [data] = useFetch(id, fetchItems);
	return (
		<div className="py-5">
			<h2 className="px-4 py-2 rounded bg-cyan-800 text-white">
				{icon} {name}
			</h2>
			<table className="w-full">
				<tr>
					<th className="px-2 py-1 w-1/6 min-w-20 border-b border-slate-300 text-center">
						買った
					</th>
					<th className="px-2 py-1 w-3/6 border-b border-slate-300 text-start">
						欲しい物
					</th>
					<th className="px-2 py-1 w-2/6 border-b border-slate-300 text-start">
						URL
					</th>
				</tr>
				{data?.map((d) => (
					<tr key={d.id}>
						<td className="px-2 py-1 w-20 border-b border-slate-300 text-center">
							<input type="checkbox" value={d.bought} disabled />
						</td>
						<td className="px-2 py-1 border-b border-slate-300">{d.name}</td>
						<td className="px-2 py-1 border-b border-slate-300 overflow-ellipsis">
							{d.url || "-"}
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
