import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";

const MAX_ACTIVE = 6;
const WAYPOINTS = 18;
const SEGMENTS = WAYPOINTS - 1;
const LIFETIME = 0.7;

interface ArcSlot {
	active: boolean;
	t: number;
	from: THREE.Vector3;
	to: THREE.Vector3;
	seed: number;
	thickness: number;
	waypoints: Float32Array;
}

export interface ArcsHandle {
	spawn: (from: THREE.Vector3, to: THREE.Vector3) => void;
}

interface Props {
	reduced?: boolean;
}

export const Arcs = forwardRef<ArcsHandle, Props>(({ reduced = false }, ref) => {
	const slots = useRef<ArcSlot[]>(
		Array.from({ length: MAX_ACTIVE }, () => ({
			active: false,
			t: 0,
			from: new THREE.Vector3(),
			to: new THREE.Vector3(),
			seed: 0,
			thickness: 1,
			waypoints: new Float32Array(WAYPOINTS * 3),
		})),
	);

	const segRefs = useRef<(THREE.LineSegments | null)[]>([]);
	const matRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);

	const geoms = useMemo(
		() =>
			Array.from({ length: MAX_ACTIVE }, () => {
				const g = new THREE.BufferGeometry();
				const positions = new Float32Array(SEGMENTS * 2 * 3);
				g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
				return g;
			}),
		[],
	);

	useImperativeHandle(
		ref,
		() => ({
			spawn: (from, to) => {
				if (reduced) return;
				const slot = slots.current.find((s) => !s.active);
				if (!slot) return;
				slot.active = true;
				slot.t = 0;
				slot.from.copy(from);
				slot.to.copy(to);
				slot.seed = Math.random() * 1000;
				slot.thickness = 0.6 + Math.random() * 0.6;
			},
		}),
		[reduced],
	);

	useFrame((_, delta) => {
		for (let i = 0; i < MAX_ACTIVE; i++) {
			const slot = slots.current[i];
			const seg = segRefs.current[i];
			const mat = matRefs.current[i];
			const geom = geoms[i];
			if (!slot || !seg || !mat || !geom) continue;

			if (!slot.active) {
				seg.visible = false;
				continue;
			}
			seg.visible = true;
			slot.t += delta;
			const lifeFrac = slot.t / LIFETIME;
			if (lifeFrac >= 1) {
				slot.active = false;
				seg.visible = false;
				continue;
			}

			// Fast attack, slow decay — feels like an arc, not a fade.
			const opacity = lifeFrac < 0.12 ? lifeFrac / 0.12 : (1 - (lifeFrac - 0.12) / 0.88) ** 1.8;
			mat.opacity = opacity * 0.95;

			// Build the polyline. Each interior point sits on the line from→to
			// with a sin-based perpendicular offset whose phase rotates over
			// the arc lifetime — gives the bolt a "twitch" while it's alive.
			const wp = slot.waypoints;
			const dir = new THREE.Vector3().subVectors(slot.to, slot.from);
			const len = dir.length();
			dir.normalize();
			const perp =
				Math.abs(dir.y) < 0.9
					? new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize()
					: new THREE.Vector3().crossVectors(dir, new THREE.Vector3(1, 0, 0)).normalize();
			const perp2 = new THREE.Vector3().crossVectors(dir, perp).normalize();

			for (let s = 0; s < WAYPOINTS; s++) {
				const u = s / (WAYPOINTS - 1);
				const ox0 = slot.from.x + dir.x * len * u;
				const oy0 = slot.from.y + dir.y * len * u;
				const oz0 = slot.from.z + dir.z * len * u;
				if (s === 0 || s === WAYPOINTS - 1) {
					wp[s * 3 + 0] = ox0;
					wp[s * 3 + 1] = oy0;
					wp[s * 3 + 2] = oz0;
					continue;
				}
				// Larger amplitude + more chaotic per-segment phase for a
				// proper jagged-bolt silhouette (was too smooth before).
				const env = Math.sin(u * Math.PI);
				const amp = 0.38 * env * slot.thickness;
				const phase = slot.seed + slot.t * 11 + s * 3.7;
				const phase2 = slot.seed * 1.7 + slot.t * 7 + s * 5.1;
				const ox = (Math.sin(phase) + Math.sin(phase2 * 1.91) * 0.5) * amp;
				const oy = (Math.sin(phase * 1.31 + 1.3) + Math.cos(phase2) * 0.5) * amp;
				wp[s * 3 + 0] = ox0 + perp.x * ox + perp2.x * oy;
				wp[s * 3 + 1] = oy0 + perp.y * ox + perp2.y * oy;
				wp[s * 3 + 2] = oz0 + perp.z * ox + perp2.z * oy;
			}

			// Emit pairs of consecutive waypoints as segments.
			const positions = geom.getAttribute("position") as THREE.BufferAttribute;
			const arr = positions.array as Float32Array;
			for (let s = 0; s < SEGMENTS; s++) {
				const a = s * 3;
				const b = (s + 1) * 3;
				const o = s * 6;
				arr[o + 0] = wp[a + 0] ?? 0;
				arr[o + 1] = wp[a + 1] ?? 0;
				arr[o + 2] = wp[a + 2] ?? 0;
				arr[o + 3] = wp[b + 0] ?? 0;
				arr[o + 4] = wp[b + 1] ?? 0;
				arr[o + 5] = wp[b + 2] ?? 0;
			}
			positions.needsUpdate = true;
		}
	});

	return (
		<group>
			{geoms.map((g, i) => (
				<lineSegments
					key={g.uuid}
					ref={(el) => {
						segRefs.current[i] = el;
					}}
					geometry={g}
				>
					<lineBasicMaterial
						ref={(el) => {
							matRefs.current[i] = el;
						}}
						color="#fb7185"
						transparent
						opacity={0}
						blending={THREE.AdditiveBlending}
						depthWrite={false}
						linewidth={1}
					/>
				</lineSegments>
			))}
		</group>
	);
});
