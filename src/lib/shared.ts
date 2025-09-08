import { useEffect, useLayoutEffect } from "react";

export type valueof<T> = T[keyof T];

export const IS_SERVER = typeof window === "undefined";

export const useIsomorphicLayoutEffect = IS_SERVER
	? useEffect
	: useLayoutEffect;
