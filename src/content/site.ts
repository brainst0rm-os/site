export const POSITIONING =
	"Brainstorm is a local-first, AI-native operating system for knowledge work. Your apps, your data, and your AI all run on your machine, with optional end-to-end encrypted sync — and every app and every agent only touches what you allow.";

export const TAGLINE_PRIMARY = "an AI-native operating system for your knowledge work";
export const TAGLINE_SUB =
	"Your apps, your data, your AI — all on your machine, under permissions you grant.";

export const SITE_NAME = "Brainstorm";
export const SITE_URL = "https://getbrainstorm.online";

export const links = {
	github: "https://github.com/brainstorm-os",
	repo: "https://github.com/brainstorm-os/shell",
	docs: "https://docs.getbrainstorm.online",
	// The downloads page lists every release with per-platform builds.
	downloads: "/downloads",
} as const;

// Hrefs are root-absolute (`/#…`) so the nav works from any page, not just the
// homepage — a bare `#overview` does nothing on /downloads, /blog, etc. The
// scroll-spy keys off `section` (the target element id), not the href.
export const nav = [
	{ label: "Overview", href: "/#overview", section: "overview" },
	{ label: "Apps", href: "/apps", section: "apps" },
	{ label: "How it works", href: "/#capabilities", section: "capabilities" },
	{ label: "Roadmap", href: "/#roadmap", section: "roadmap" },
] as const;
