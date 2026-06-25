import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Scene = lazy(() => import("~/three/Scene"));

function shouldLoadScene(): boolean {
	if (typeof window === "undefined") return false;
	const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReduced) return false;
	const conn = (
		navigator as Navigator & {
			connection?: { saveData?: boolean; effectiveType?: string };
		}
	).connection;
	if (conn?.saveData) return false;
	if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return false;
	return true;
}

export default function HeroScene() {
	const [load, setLoad] = useState(false);
	// Pause the render loop once the hero scrolls out of view (or the tab is
	// hidden) — a continuous WebGL loop behind the rest of the page is wasted GPU.
	const [active, setActive] = useState(true);
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLoad(shouldLoadScene());
	}, []);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el || typeof IntersectionObserver === "undefined") return;
		const io = new IntersectionObserver(([entry]) => setActive(entry?.isIntersecting ?? true), {
			threshold: 0.01,
		});
		io.observe(el);
		const onVis = () => setActive(!document.hidden);
		document.addEventListener("visibilitychange", onVis);
		return () => {
			io.disconnect();
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);

	// The wrapper is always rendered (sized) so Canvas has a parent to size
	// against the moment Scene mounts. Inner content is conditional.
	return (
		<div ref={wrapRef} style={{ width: "100%", height: "100%", position: "relative" }}>
			{load && (
				<Suspense fallback={null}>
					<Scene active={active} />
				</Suspense>
			)}
		</div>
	);
}
