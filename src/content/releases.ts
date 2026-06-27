export const Platform = {
	Mac: "mac",
	Windows: "windows",
	Linux: "linux",
} as const;
export type Platform = (typeof Platform)[keyof typeof Platform];

export const ReleaseChannel = {
	Stable: "stable",
	Beta: "beta",
} as const;
export type ReleaseChannel = (typeof ReleaseChannel)[keyof typeof ReleaseChannel];

export interface PlatformMeta {
	id: Platform;
	name: string;
	requirement: string;
}

// Display order + names for the per-platform download cards. The requirement
// line states the supported floor honestly; it isn't a marketing claim.
export const PLATFORMS: readonly PlatformMeta[] = [
	{ id: Platform.Mac, name: "macOS", requirement: "macOS 12 Monterey or later" },
	{ id: Platform.Windows, name: "Windows", requirement: "Windows 10 or later" },
	{ id: Platform.Linux, name: "Linux", requirement: "AppImage · Debian · RPM" },
] as const;
