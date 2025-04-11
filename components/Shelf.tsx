"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import {
	useTexture,
	useGLTF,
	useHelper,
	AccumulativeShadows,
	RandomizedLight,
} from "@react-three/drei";
import { useCustomization } from "@/contexts/Customization";
import { Center } from "@react-three/drei";

function Shelf({ shelfCount = 9, spacing = 0.21 }) {
	const { nodes, materials } = useGLTF("/models/mat_rack.glb"); // Adjust if needed
	const topshelfRef = useRef();
	const frameRef = useRef();
	const temp = new THREE.Object3D();
	const shelfRef = useRef(null);

	const { shelfColor, frameColor, selectedRack } = useCustomization();

	// Wooden texture for the shelves (pallet-like)
	const woodTexture = useTexture({
		map: "/textures/wood/wood_pallet_basecolor.jpg", // Replace with your wood texture path
		normalMap: "/textures/wood/wood_pallet_normal.jpg", // Replace with your normal map path
		roughnessMap: "/textures/wood/wood_pallet_roughness.jpg", // Roughness for realism
		aoMap: "/textures/wood/wood_pallet_ambientOcclusion.jpg", // Ambient occlusion map
	});

	// Black material for the frame (hinges)
	const blackMaterial = new THREE.MeshStandardMaterial({ color: "#000" });

	useEffect(() => {
		if (topshelfRef.current && frameRef.current) {
			for (let i = 0; i < shelfCount; i++) {
				temp.position.set(0, i * spacing, 0);
				temp.updateMatrix();
				topshelfRef.current.setMatrixAt(i, temp.matrix);

				temp.position.set(0, i * spacing, 0);
				temp.updateMatrix();
				frameRef.current.setMatrixAt(i, temp.matrix);
			}
			topshelfRef.current.instanceMatrix.needsUpdate = true;
			frameRef.current.instanceMatrix.needsUpdate = true;
		}
	}, [shelfCount, spacing]);

	return (
		<group
			position={[0, -0.6, 0]}
			rotation={[0, 0.9, 0]}
		>
			{/* Bottom shelf - Always rendered */}
			<Center bottom>
				<mesh
					geometry={nodes.bottomshelf.geometry}
					castShadow
					ref={shelfRef}
					scale={[selectedRack?.length / 100, 1, 1]}
				>
					<meshStandardMaterial
						map={woodTexture.map}
						normalMap={woodTexture.normalMap}
						roughnessMap={woodTexture.roughnessMap}
						aoMap={woodTexture.aoMap}
					/>
				</mesh>

				{/* Instanced top shelves */}
				<instancedMesh
					ref={topshelfRef}
					args={[nodes.topshelf.geometry, null, shelfCount]}
					castShadow
					scale={[selectedRack?.length / 100, 1, 1]}
				>
					<meshStandardMaterial
						map={woodTexture.map}
						normalMap={woodTexture.normalMap}
						roughnessMap={woodTexture.roughnessMap}
						aoMap={woodTexture.aoMap}
					/>
				</instancedMesh>

				{/* Frame (hinges) */}
				<instancedMesh
					ref={frameRef}
					args={[nodes.frame.geometry, null, shelfCount]}
					castShadow
					scale={[selectedRack?.length / 100, 1, 1]}
				>
					<primitive object={blackMaterial} />
				</instancedMesh>

				<AccumulativeShadows
					temporal
					frames={100}
					color="black"
					limit={54}
					colorBlend={2}
					alphaTest={0.75}
					opacity={2}
					scale={10}
				>
					<RandomizedLight
						castShadow
						intensity={Math.PI}
						amount={8}
						radius={5}
						ambient={0.5}
						position={[5, 3, 2]}
						bias={0.001}
					/>
				</AccumulativeShadows>
			</Center>
		</group>
	);
}

useGLTF.preload("/models/mat_rack.glb");

export default Shelf;
