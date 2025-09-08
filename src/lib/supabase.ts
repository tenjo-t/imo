import type { User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { atom, getDefaultStore, useAtom } from "jotai";
import { useEffect } from "react";

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

async function fetchCategories() {
	const { data, error } = await supabase.from("category").select();
	if (error != null) {
		throw error;
	}
	return data;
}

const category = atom(fetchCategories());

export function useCategory() {
	const [cats] = useAtom(category);
	return cats;
}

//
// Authentication
//

export async function signIn() {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});

	if (error != null) throw error;
}

export async function signOut() {
	await supabase.auth.signOut();
}

export type UserMetadata = {
	email: string;
	user_name: string;
	full_name: string;
	avatar_url: string;
};

const userAtom = atom<User | null>(null);
// init user
const store = getDefaultStore();
supabase.auth.getUser().then(({ data }) => {
	if (data.user !== null && store.get(userAtom) === null) {
		store.set(userAtom, data.user);
	}
});

export function useUser(): UserMetadata | null {
	const [user, setUser] = useAtom(userAtom);
	useEffect(() => {
		supabase.auth.getUser().then(({ data }) => {
			setUser(data.user);
		});
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			switch (event) {
				case "SIGNED_IN":
				case "SIGNED_OUT":
					setUser(session?.user ?? null);
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, [setUser]);
	return (user?.user_metadata as UserMetadata) ?? null;
}
