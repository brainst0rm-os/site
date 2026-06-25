export const POSITIONING =
	"Brainstorm is a local-first, AI-native operating system for knowledge work. Your apps, your data, and your AI all run on your machine — and every app and every agent only touches what you allow.";

export const TAGLINE_PRIMARY = "an AI-native operating system for your knowledge work";
export const TAGLINE_SUB =
	"Your apps, your data, your AI — all on your machine, under permissions you grant.";

export const SITE_NAME = "Brainstorm";
export const SITE_URL = "https://getbrainstorm.online";

export const links = {
	github: "https://github.com/brainst0rm-os",
	repo: "https://github.com/brainst0rm-os/shell",
	docs: "https://docs.getbrainstorm.online",
	// Download endpoints — wired in V1-X when the release surface lands.
	download: {
		mac: "/download/mac",
		windows: "/download/windows",
		linux: "/download/linux",
	},
} as const;

export const nav = [
	{ label: "Overview", href: "#overview", section: "overview" },
	{ label: "Screenshots", href: "#inside", section: "inside" },
	{ label: "How it works", href: "#capabilities", section: "capabilities" },
	{ label: "Roadmap", href: "#roadmap", section: "roadmap" },
] as const;
