/**
 * Hero scroll progress in [0,1]: 0 at the top, 1 once roughly one viewport
 * has scrolled. Drives the hero crystal receding into a quiet background as you
 * move down the page.
 */
export function getHeroDim(): number {
	if (typeof window === "undefined") return 0;
	return Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.9));
}
