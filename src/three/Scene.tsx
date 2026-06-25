import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Arcs, type ArcsHandle } from "./Arcs";
import { CentralForm } from "./CentralForm";
import { Particles } from "./Particles";
import { Shards } from "./Shards";
import { PaletteContext, type ScenePalette, usePalette } from "./palette";

function detectMobile(): boolean {
	if (typeof window === "undefined") return false;
	const coarse = window.matchMedia("(pointer: coarse)").matches;
	const narrow = window.innerWidth < 820;
	return coarse || narrow;
}

function CameraRig({ touchOnly }: { touchOnly: boolean }) {
	const pointer = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (touchOnly) return;
		const onMove = (e: PointerEvent) => {
			pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [touchOnly]);

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;
		const px = touchOnly ? Math.sin(t * 0.18) * 0.6 : pointer.current.x;
		const py = touchOnly ? Math.cos(t * 0.13) * 0.5 : pointer.current.y;
		const targetX = px * 0.55;
		const targetY = 0.15 + py * 0.4;
		const targetZ = 4.8;
		const k = Math.min(1, delta * 1.6);
		state.camera.position.x += (targetX - state.camera.position.x) * k;
		state.camera.position.y += (targetY - state.camera.position.y) * k;
		state.camera.position.z += (targetZ - state.camera.position.z) * k;
		state.camera.lookAt(0, 0, 0);
	});

	return null;
}

interface SceneBodyProps {
	mobile: boolean;
	reduced: boolean;
}

function SceneBody({ mobile, reduced }: SceneBodyProps) {
	const palette = usePalette();
	const arcsRef = useRef<ArcsHandle>(null);
	const shardPositionsRef = useRef<THREE.Vector3[]>([]);
	const pointLightRef = useRef<THREE.PointLight>(null);
	const ambientRef = useRef<THREE.AmbientLight>(null);
	const autoSpawnRef = useRef({ next: 1.2, nextFlash: 5 });

	const spawnArc = () => {
		const positions = shardPositionsRef.current;
		if (!positions.length) return;
		// 30% of arcs are shard→shard (no central origin); the rest are
		// center→shard. Shard→shard reads like a "thought jumping" between
		// orbiting ideas.
		const shardToShard = Math.random() < 0.3 && positions.length > 1;
		let from: THREE.Vector3;
		let to: THREE.Vector3;
		if (shardToShard) {
			const i = Math.floor(Math.random() * positions.length);
			let j = Math.floor(Math.random() * positions.length);
			while (j === i) j = Math.floor(Math.random() * positions.length);
			from = (positions[i] ?? new THREE.Vector3()).clone();
			to = (positions[j] ?? new THREE.Vector3()).clone();
		} else {
			from = new THREE.Vector3(
				(Math.random() - 0.5) * 0.7,
				(Math.random() - 0.5) * 0.7,
				(Math.random() - 0.5) * 0.7,
			);
			const target = positions[Math.floor(Math.random() * positions.length)];
			if (!target) return;
			to = target.clone();
		}
		arcsRef.current?.spawn(from, to);
	};

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;

		// Auto-spawn arcs on an irregular interval — keeps the scene visibly
		// active even between CentralForm spikes.
		if (!reduced && t >= autoSpawnRef.current.next) {
			spawnArc();
			// Sometimes spawn a second arc in the same frame for a "double flash" beat.
			if (Math.random() < 0.25) spawnArc();
			autoSpawnRef.current.next = t + 1.2 + Math.random() * 2.4;
		}

		// Storm flash — every 6–10s a very subtle pulse, like distant
		// lightning glow refracted through the storm. Deliberately small —
		// the previous version was eye-burning. Quick attack, soft decay,
		// low peak.
		if (!reduced && t >= autoSpawnRef.current.nextFlash) {
			autoSpawnRef.current.nextFlash = t + 7 + Math.random() * 4;
			spawnArc();
		}
		// Envelope: rises over 60ms, decays over ~500ms.
		const flashWindow = autoSpawnRef.current.nextFlash - t;
		const sinceFlashStart = Math.max(0, 7.06 - flashWindow);
		const flashing =
			sinceFlashStart < 0.06
				? sinceFlashStart / 0.06
				: Math.max(0, 1 - (sinceFlashStart - 0.06) / 0.5);
		if (ambientRef.current) {
			ambientRef.current.intensity = 0.22 + flashing * 0.08;
		}
		if (pointLightRef.current) {
			pointLightRef.current.intensity = 1.8 + flashing * 0.6;
		}

		// Stash delta usage to keep the linter happy on the unused param.
		void delta;
	});

	const onSpike = () => spawnArc();

	const detail = mobile ? 18 : 36;
	const shardCount = mobile ? 12 : 24;
	const particleCount = mobile ? 80 : 240;

	return (
		<>
			<CameraRig touchOnly={mobile} />

			{/* Lifted ambient + hemisphere fill so shadow sides of shards are
			    cyan-tinted dark, not pure black silhouettes against the bg.
			    Ambient + point intensity also pulse on the periodic storm
			    flash (see SceneBody useFrame). */}
			<ambientLight ref={ambientRef} intensity={0.22} />
			<hemisphereLight args={[palette.hemiSky, palette.hemiGround, 0.55]} />

			<directionalLight
				position={[3.2, 4.8, 2.2]}
				intensity={3.0}
				color="#ffffff"
				castShadow={!mobile}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={0.5}
				shadow-camera-far={12}
				shadow-bias={-0.0005}
			/>
			<directionalLight position={[-3, 1.4, -2.5]} intensity={1.4} color={palette.fillBack} />
			<pointLight
				ref={pointLightRef}
				position={[0, 0, 0]}
				intensity={1.8}
				color={palette.pointCore}
				distance={4}
				decay={2}
			/>

			<CentralForm detail={detail} reduced={reduced} onSpike={onSpike} />
			<Shards
				count={shardCount}
				reduced={reduced}
				exposeShardPositions={(p) => {
					shardPositionsRef.current = p;
				}}
			/>
			<Arcs ref={arcsRef} reduced={reduced} />
			{!reduced && <Particles count={particleCount} radius={5} />}

			{/* Bloom + vignette — same recipe family as mysite's hero. The
			    canvas edges are masked CSS-side (linear-gradient mask on
			    .scene-bleed) so vignette darkening fades smoothly into the
			    page bg instead of forming a hard rectangle.
			    Chromatic aberration stays out — added RGB fringe on shards. */}
			{!mobile && !reduced && (
				<EffectComposer multisampling={0}>
					<Bloom
						intensity={0.85}
						luminanceThreshold={0.55}
						luminanceSmoothing={0.28}
						mipmapBlur
						radius={0.8}
					/>
					<Vignette eskil={false} offset={0.22} darkness={0.85} />
				</EffectComposer>
			)}
		</>
	);
}

export default function Scene({
	active = true,
	palette,
}: { active?: boolean; palette: ScenePalette }) {
	const [mobile, setMobile] = useState(false);
	const [reduced, setReduced] = useState(false);
	const [dpr, setDpr] = useState(1);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const m = detectMobile();
		setMobile(m);
		const cap = m ? 1.25 : 1.75;
		setDpr(Math.min(window.devicePixelRatio || 1, cap));
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const handler = () => setReduced(mq.matches);
		mq.addEventListener("change", handler);
		setReady(true);
		return () => mq.removeEventListener("change", handler);
	}, []);

	if (!ready) {
		return <div style={{ width: "100%", height: "100%" }} />;
	}

	return (
		<Canvas
			frameloop={active ? "always" : "never"}
			gl={{
				antialias: !mobile,
				alpha: true,
				powerPreference: mobile ? "default" : "high-performance",
			}}
			dpr={dpr}
			shadows={!mobile}
			camera={{ position: [0, 0.15, 4.8], fov: 38, near: 0.1, far: 30 }}
			onCreated={({ gl, scene }) => {
				gl.setClearColor("#000000", 0);
				gl.toneMapping = THREE.ACESFilmicToneMapping;
				gl.toneMappingExposure = 1.05;
				// Fog matches the page background gradient's deepest stop so the
				// orbiting shards fade into the page rather than being silhouettes.
				scene.fog = new THREE.Fog(palette.fog, 4, 11);
			}}
		>
			<PaletteContext.Provider value={palette}>
				<SceneBody mobile={mobile} reduced={reduced} />
			</PaletteContext.Provider>
		</Canvas>
	);
}
