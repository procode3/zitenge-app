"use client";
import React, { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Rack from "./Rack";

function MouseCameraController() {
	const { camera, mouse } = useThree();

	useFrame(() => {
		// Smoothly follow the mouse
		const targetX = mouse.x * 0.5;
		const targetY = 1.5 + mouse.y * 0.5;

		camera.position.x += (targetX - camera.position.x) * 0.05;
		camera.position.y += (targetY - camera.position.y) * 0.05;
		camera.lookAt(0, 0, 0); // Keep looking at the model
	});

	return null;
}

export default function HeroModel() {
	const [fov, setFov] = useState(20); // Default FOV for normal screens

	useEffect(() => {
		// Adjust FOV based on screen size
		const handleResize = () => {
			if (window.innerWidth < 768) {
				// For small screens (mobile/tablets)
				setFov(45);
			} else {
				// For larger screens (laptops/desktops)
				setFov(20);
			}
		};

		// Set initial FOV
		handleResize();

		// Add resize event listener
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="w-full h-full">
			<Canvas
				shadows
				camera={{ position: [20, 10, 3.5], fov }} // Dynamically set FOV
				dpr={1.5}
				gl={{ preserveDrawingBuffer: true }}
			>
				<color
					attach="background"
					args={["#fff"]}
				/>
				<MouseCameraController />
				<Rack shelfCount={5} />
				<Environment preset="city" />
			</Canvas>
		</div>
	);
}
