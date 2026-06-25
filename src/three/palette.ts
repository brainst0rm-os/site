import { createContext, useContext } from "react";

/** Colours the hero scene draws with, swapped per theme. */
export interface ScenePalette {
	hemiSky: string;
	hemiGround: string;
	fillBack: string;
	pointCore: string;
	fog: string;
	formA: string;
	formB: string;
	formC: string;
	shard: string;
	shardEmissive: string;
	arc: string;
	particle: string;
}

/** Rose — the default (light) theme: warm crimson crystal. */
export const ROSE: ScenePalette = {
	hemiSky: "#be123c",
	hemiGround: "#f7dde4",
	fillBack: "#9f1239",
	pointCore: "#e11d48",
	fog: "#fdf4f6",
	formA: "#be123c",
	formB: "#9f1239",
	formC: "#e11d48",
	shard: "#be123c",
	shardEmissive: "#e11d48",
	arc: "#fb7185",
	particle: "#be123c",
};

/** Midnight — the dark theme. The original blue-site look: an icy near-white
   crystal lit by cyan, on navy. Cyan family from the icon (icon.svg boltGrad). */
export const MIDNIGHT: ScenePalette = {
	hemiSky: "#cfe8f7",
	hemiGround: "#16243f",
	fillBack: "#2b9bd1",
	pointCore: "#1ea8d6",
	fog: "#0a1020",
	formA: "#bcd6ee",
	formB: "#5cc8ee",
	formC: "#e8fbff",
	shard: "#bcd6ee",
	shardEmissive: "#1ea8d6",
	arc: "#5cc8ee",
	particle: "#9ecbe8",
};

export function getScenePalette(theme: string | undefined): ScenePalette {
	return theme === "dark" ? MIDNIGHT : ROSE;
}

export const PaletteContext = createContext<ScenePalette>(ROSE);
export const usePalette = (): ScenePalette => useContext(PaletteContext);
