import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Shard {
	radius: number;
	angle: number;
	speed: number;
	tilt: THREE.Euler;
	plane: number;
	size: number;
	tumbleAxis: THREE.Vector3;
	tumbleSpeed: number;
	phase: number;
}

interface Props {
	count?: number;
	reduced?: boolean;
	exposeShardPositions?: (positions: THREE.Vector3[]) => void;
}

const PLANE_TILTS = [
	new THREE.Euler(0, 0, 0),
	new THREE.Euler(1.1, 0.3, 0),
	new THREE.Euler(-0.55, 0.9, 0.4),
];

export function Shards({ count = 22, reduced = false, exposeShardPositions }: Props) {
	const groupRef = useRef<THREE.Group>(null);
	const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
	const positionsRef = useRef<THREE.Vector3[]>([]);

	const shards = useMemo<Shard[]>(() => {
		const out: Shard[] = [];
		// Deterministic pseudorandom so the layout is stable across renders.
		let seed = 1337;
		const rand = () => {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280;
		};
		for (let i = 0; i < count; i++) {
			const plane = i % PLANE_TILTS.length;
			const tilt = PLANE_TILTS[plane] ?? new THREE.Euler();
			const radius = 1.85 + rand() * 1.45;
			const dir = rand() > 0.5 ? 1 : -1;
			out.push({
				radius,
				angle: rand() * Math.PI * 2,
				speed: (0.04 + rand() * 0.12) * dir,
				tilt,
				plane,
				size: 0.06 + rand() * 0.13,
				tumbleAxis: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(),
				tumbleSpeed: 0.3 + rand() * 0.7,
				phase: rand() * Math.PI * 2,
			});
		}
		return out;
	}, [count]);

	useMemo(() => {
		positionsRef.current = shards.map(() => new THREE.Vector3());
	}, [shards]);

	useFrame((_, delta) => {
		const slowdown = reduced ? 0 : 1;
		for (let i = 0; i < shards.length; i++) {
			const s = shards[i];
			const mesh = meshRefs.current[i];
			const pos = positionsRef.current[i];
			if (!s || !mesh || !pos) continue;
			s.angle += s.speed * delta * slowdown;
			const localX = Math.cos(s.angle) * s.radius;
			const localY = Math.sin(s.angle) * s.radius * 0.7;
			const localZ = Math.sin(s.angle * 0.5 + s.phase) * 0.6;
			const v = new THREE.Vector3(localX, localY, localZ).applyEuler(s.tilt);
			mesh.position.copy(v);
			pos.copy(v);
			mesh.rotateOnAxis(s.tumbleAxis, s.tumbleSpeed * delta * slowdown);
		}
		exposeShardPositions?.(positionsRef.current);
	});

	return (
		<group ref={groupRef}>
			{shards.map((s, i) => (
				<mesh
					key={`shard-${i}-${s.plane}`}
					ref={(el) => {
						meshRefs.current[i] = el;
					}}
					castShadow
				>
					<tetrahedronGeometry args={[s.size, 0]} />
					{/* Subtle cyan emissive so shadow-side faces aren't pure black
					    silhouettes against the navy page background. */}
					<meshStandardMaterial
						color="#be123c"
						emissive="#e11d48"
						emissiveIntensity={0.08}
						roughness={0.45}
						metalness={0.18}
						flatShading
						envMapIntensity={0.5}
					/>
				</mesh>
			))}
		</group>
	);
}
