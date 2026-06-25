import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { noise3D } from "./noise";
import { usePalette } from "./palette";

interface Uniforms {
	uTime: { value: number };
	uAmp: { value: number };
	uFreq: { value: number };
	uSpike: { value: number };
}

function makeUniforms(): Uniforms {
	return {
		uTime: { value: 0 },
		uAmp: { value: 0.22 },
		uFreq: { value: 1.6 },
		uSpike: { value: 0 },
	};
}

function injectDisplacement(uniforms: Uniforms) {
	return (shader: THREE.WebGLProgramParametersWithUniforms) => {
		shader.uniforms.uTime = uniforms.uTime;
		shader.uniforms.uAmp = uniforms.uAmp;
		shader.uniforms.uFreq = uniforms.uFreq;
		shader.uniforms.uSpike = uniforms.uSpike;
		shader.vertexShader = shader.vertexShader.replace(
			"#include <common>",
			/* glsl */ `
				#include <common>
				uniform float uTime;
				uniform float uAmp;
				uniform float uFreq;
				uniform float uSpike;
				${noise3D}
			`,
		);
		shader.vertexShader = shader.vertexShader.replace(
			"#include <begin_vertex>",
			/* glsl */ `
				vec3 transformed = displaced(position, normal, uTime, uAmp, uFreq, uSpike);
			`,
		);
	};
}

interface Props {
	onSpike?: () => void;
	detail?: number;
	reduced?: boolean;
}

export function CentralForm({ onSpike, detail = 32, reduced = false }: Props) {
	const palette = usePalette();
	const solidRef = useRef<THREE.Mesh>(null);
	const wireRef = useRef<THREE.LineSegments>(null);
	const coreRef = useRef<THREE.Mesh>(null);
	const solidMatRef = useRef<THREE.MeshStandardMaterial>(null);
	const wireMatRef = useRef<THREE.LineBasicMaterial>(null);
	const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);

	const geom = useMemo(() => new THREE.IcosahedronGeometry(1.0, detail), [detail]);
	const wireGeom = useMemo(() => new THREE.EdgesGeometry(geom, 1), [geom]);

	const solidUniforms = useMemo(makeUniforms, []);
	const wireUniforms = useMemo(makeUniforms, []);

	const solidCompile = useMemo(() => injectDisplacement(solidUniforms), [solidUniforms]);
	const wireCompile = useMemo(() => {
		const inject = injectDisplacement(wireUniforms);
		return (shader: THREE.WebGLProgramParametersWithUniforms) => {
			inject(shader);
			// Slight outward scale on the wire pass so it floats just above the
			// solid surface — avoids z-fighting and reads as a wireframe overlay
			// rather than coplanar lines.
			shader.vertexShader = shader.vertexShader.replace(
				"vec3 transformed = displaced(position, normal, uTime, uAmp, uFreq, uSpike);",
				"vec3 transformed = displaced(position, normal, uTime, uAmp, uFreq, uSpike) * 1.012;",
			);
		};
	}, [wireUniforms]);

	const spikeFired = useRef(false);

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;

		// Long-period breath + short-period chatter on amplitude.
		const breath = 0.18 + Math.sin(t * 0.27) * 0.06 + Math.sin(t * 0.91) * 0.018;
		// Thought spikes — every 3-7 seconds a brief sharp deformation.
		const spikePhase = Math.sin(t * 0.34) + Math.sin(t * 0.51 + 1.7);
		const spike = Math.max(0, spikePhase - 1.6) / 0.4;
		const spikeScaled = reduced ? 0 : spike * 0.45;

		solidUniforms.uTime.value = t;
		solidUniforms.uAmp.value = breath;
		solidUniforms.uSpike.value = spikeScaled;
		wireUniforms.uTime.value = t;
		wireUniforms.uAmp.value = breath;
		wireUniforms.uSpike.value = spikeScaled;

		// Fire onSpike on the rising edge so consumers (Arcs) get one event per
		// pulse, not every frame.
		if (spikeScaled > 0.25 && !spikeFired.current) {
			spikeFired.current = true;
			onSpike?.();
		} else if (spikeScaled < 0.05) {
			spikeFired.current = false;
		}

		// Slow, multi-axis rotation — never repeats exactly within a viewing
		// session because the periods are irrational ratios.
		if (solidRef.current) {
			solidRef.current.rotation.y += delta * 0.08;
			solidRef.current.rotation.x = Math.sin(t * 0.13) * 0.18;
			solidRef.current.rotation.z = Math.cos(t * 0.08) * 0.06;
		}
		if (wireRef.current && solidRef.current) {
			wireRef.current.rotation.copy(solidRef.current.rotation);
		}
		if (coreRef.current) {
			coreRef.current.rotation.y -= delta * 0.22;
			const pulse = 1 + Math.sin(t * 1.9) * 0.04 + spikeScaled * 0.15;
			coreRef.current.scale.setScalar(pulse);
		}
		if (coreMatRef.current) {
			coreMatRef.current.opacity = 0.55 + Math.sin(t * 1.4) * 0.08 + spikeScaled * 0.25;
		}
		if (wireMatRef.current) {
			wireMatRef.current.opacity = 0.42 + spikeScaled * 0.45;
		}
	});

	return (
		<group>
			<mesh ref={solidRef} geometry={geom} castShadow receiveShadow>
				<meshStandardMaterial
					ref={solidMatRef}
					color={palette.formA}
					roughness={0.34}
					metalness={0.18}
					flatShading
					envMapIntensity={0.4}
					onBeforeCompile={solidCompile}
				/>
			</mesh>

			<lineSegments ref={wireRef} geometry={wireGeom}>
				<lineBasicMaterial
					ref={wireMatRef}
					color={palette.formB}
					transparent
					opacity={0.45}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					onBeforeCompile={wireCompile}
				/>
			</lineSegments>

			<mesh ref={coreRef}>
				<sphereGeometry args={[0.42, 24, 24]} />
				<meshBasicMaterial
					ref={coreMatRef}
					color={palette.formC}
					transparent
					opacity={0.55}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>
		</group>
	);
}
