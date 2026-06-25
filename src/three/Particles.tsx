import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Props {
	count?: number;
	radius?: number;
}

export function Particles({ count = 220, radius = 5 }: Props) {
	const pointsRef = useRef<THREE.Points>(null);

	const { positions, sizes } = useMemo(() => {
		const positions = new Float32Array(count * 3);
		const sizes = new Float32Array(count);
		let seed = 7919;
		const rand = () => {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280;
		};
		for (let i = 0; i < count; i++) {
			// Spherical shell, biased outward — keeps the central form clear.
			const r = radius * (0.5 + rand() ** 0.5 * 0.7);
			const theta = rand() * Math.PI * 2;
			const phi = Math.acos(2 * rand() - 1);
			positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);
			sizes[i] = 0.008 + rand() * 0.018;
		}
		return { positions, sizes };
	}, [count, radius]);

	const geom = useMemo(() => {
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
		return g;
	}, [positions, sizes]);

	const mat = useMemo(() => {
		return new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: new THREE.Color("#be123c") },
			},
			vertexShader: /* glsl */ `
				attribute float size;
				uniform float uTime;
				varying float vAlpha;
				void main() {
					vec3 p = position;
					float drift = sin(uTime * 0.18 + p.x * 0.5 + p.z * 0.3) * 0.06;
					p.y += drift;
					vec4 mv = modelViewMatrix * vec4(p, 1.0);
					gl_Position = projectionMatrix * mv;
					gl_PointSize = size * (320.0 / -mv.z);
					vAlpha = 0.45 + 0.55 * sin(uTime * 0.7 + p.x * 1.7 + p.y * 1.3);
				}
			`,
			fragmentShader: /* glsl */ `
				uniform vec3 uColor;
				varying float vAlpha;
				void main() {
					vec2 uv = gl_PointCoord - 0.5;
					float d = length(uv);
					if (d > 0.5) discard;
					float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.55;
					gl_FragColor = vec4(uColor, a);
				}
			`,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		});
	}, []);

	useFrame((state) => {
		const u = mat.uniforms.uTime;
		if (u) u.value = state.clock.elapsedTime;
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
		}
	});

	return <points ref={pointsRef} geometry={geom} material={mat} />;
}
