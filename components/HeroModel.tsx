"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Backdrop } from "@react-three/drei";
import Rack from "./Rack";
import { Group } from "three";

function CameraRig({ customizing }: { customizing: boolean }) {
	const group = useRef<Group>(null);
	const isDragging = useRef(false);
	const previousX = useRef(0);
	const mouseX = useRef(0);

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (customizing) {
				isDragging.current = true;
				previousX.current = e.clientX;
			}
		};

		const handleMouseUp = () => {
			isDragging.current = false;
		};

		const handleMouseMove = (e: MouseEvent) => {
			const normalizedX = (e.clientX / window.innerWidth) * 2 - 1.5;
			mouseX.current = normalizedX;

			if (customizing && isDragging.current && group.current) {
				const deltaX = e.clientX - previousX.current;
				previousX.current = e.clientX;
				group.current.rotation.y += deltaX * 0.005;
			}
		};

		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [customizing]);

	useFrame(() => {
		if (!group.current) return;

		// Subtle mouse-follow rotation when NOT customizing
		if (!customizing) {
			const targetRotationY = mouseX.current * 0.2;
			group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
		}

		// Animate position
		const targetX = customizing ? -0.8 : 1;
		const targetY = 0.3;
		const targetZ = 0;

		group.current.position.x += (targetX - group.current.position.x) * 0.1;
		group.current.position.y += (targetY - group.current.position.y) * 0.1;
		group.current.position.z += (targetZ - group.current.position.z) * 0.1;
	});

	return <group ref={group}><Rack shelfCount={5} /></group>;
}

export default function HeroModel({
	customizing = false,
}: {
	offset?: number;
	customizing?: boolean;
}) {
	const [fov, setFov] = useState(45);

	useEffect(() => {
		const handleResize = () => {
			setFov(window.innerWidth < 768 ? 45 : 20);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="absolute inset-0 pointer-events-none w-full -z-10">
			<Canvas
				className="pointer-events-auto"
				shadows
				dpr={1.5}
				gl={{ preserveDrawingBuffer: true }}
				camera={{ position: [0, 1.5, 6], fov }}
			>

				<color attach="background" args={["#ffffff"]} />
				<ambientLight intensity={0.2} color={'cyan'} />
				<directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
				<Environment preset="city" />
				<Backdrop
					floor={2}
					segments={30}
					scale={[15, 5, 5]}
					position={[0, -1, -2]}
					receiveShadow
				>
					<meshStandardMaterial color="#fffff0" />
				</Backdrop>

				<CameraRig customizing={customizing} />


			</Canvas>
		</div>
	);
}
