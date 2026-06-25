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

/** Midnight — the dark theme: cool navy/cyan crystal. */
export const MIDNIGHT: ScenePalette = {
	hemiSky: "#1e6fa8",
	hemiGround: "#bfe3f5",
	fillBack: "#1e4f7a",
	pointCore: "#38bdf8",
	fog: "#0a1020",
	formA: "#2b9bd1",
	formB: "#1e5f8f",
	formC: "#5cc8ee",
	shard: "#2b9bd1",
	shardEmissive: "#38bdf8",
	arc: "#7dd3fc",
	particle: "#38bdf8",
};

export function getScenePalette(theme: string | undefined): ScenePalette {
	return theme === "dark" ? MIDNIGHT : ROSE;
}

export const PaletteContext = createContext<ScenePalette>(ROSE);
export const usePalette = (): ScenePalette => useContext(PaletteContext);
