'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import {
  // useTexture,
  useGLTF,
  useHelper,
  AccumulativeShadows,
  RandomizedLight,
} from '@react-three/drei';
import { Center } from '@react-three/drei';
import { useCustomization } from '@/contexts/Customization';

function Rack({ shelfCount = 9, spacing = 0.21 }) {
  const {
    nodes,
    // materials 
  } = useGLTF('/models/mat_rack.glb') as unknown as {
    nodes: {
      topshelf: THREE.Mesh;
      bottomshelf: THREE.Mesh;
      frame: THREE.Mesh;
    };
  };
  const topshelfRef = useRef<THREE.InstancedMesh>(null!);
  const frameRef = useRef<THREE.InstancedMesh>(null!);
  const temp = new THREE.Object3D();
  const rackRef = useRef<THREE.InstancedMesh>(null!);

  const { shelfColor, frameColor, selectedRack } = useCustomization();
  const directionalLightRef = useRef<THREE.SpotLight>(null!);

  useHelper(directionalLightRef, THREE.SpotLightHelper, 2);

  //   const rusticTextureProps = useTexture({
  //       map: '/textures/rustic/Wood_027_basecolor.jpg',
  //       normalMap: '/textures/rustic/Wood_027_normal.jpg',
  //       roughnessMap: '/textures/rustic/Wood_027_roughness.jpg',
  //       aoMap: '/textures/rustic/Wood_027_ambientOcclusion.jpg',
  //       });

  //   const bareWoodTextureProps = useTexture({
  //       map: '/textures/bare_wood/bare-wood1_albedo.png',
  //       normalMap: '/textures/bare_wood/bare-wood1_normal-ogl.png',
  //       roughnessMap: '/textures/bare_wood/bare-wood1_roughness.png',
  //       aoMap: '/textures/bare_wood/bare-wood1_ao.png',
  //       heightMap: '/textures/bare_wood/bare-wood1_height.png',
  //       metalnessMap: '/textures/bare_wood/bare-wood1_metallic.png',
  //       });

  //   const whiteOakTextureProps = useTexture({
  //       map: '/textures/solid/wood02_glossiness.jpg',
  //       normalMap: '/textures/solid/wood02_normal.jpg',
  //       roughnessMap: '/textures/solid/wood02_roughness.jpg',
  //       metalnessMap: '/textures/solid/wood02_metallic.jpg',
  //       heightMap: '/textures/solid/wood02_height.jpg',
  //       diffuseMap: '/textures/solid/wood02_diffuse.jpg',
  //       });

  //   const veneerTextureProps = useTexture({
  //     map: '/textures/veneer/Wood_BaseColor.png',
  //     normalMap: '/textures/veneer/Wood_Normal.png',
  //     roughnessMap: '/textures/veneer/Wood_Roughness.png',
  //     heightMap: '/textures/veneer/Wood_Displacement.png',
  //   });

  //   const paleAshTextureProps = useTexture({
  //     map: '/textures/pale_ash/pale ash_BaseColor.png',
  //     heightMap: '/textures/pale_ash/pale ash_Displacement.png',
  //     normalMap: '/textures/pale_ash/pale ash_Normal.png',
  //     aoMap: '/textures/pale_ash/pale ash_AO.png',
  // });

  useEffect(() => {
    if (topshelfRef.current && frameRef.current) {
      // Set positions for topshelves
      for (let i = 0; i < shelfCount; i++) {
        // Position each shelf above the bottom shelf
        temp.position.set(0, i * spacing, 0); // +1 because bottom shelf is at 0
        temp.updateMatrix();
        topshelfRef.current.setMatrixAt(i, temp.matrix);

        temp.position.set(0, i * spacing, 0); // +1 because bottom shelf is at 0
        temp.updateMatrix();
        frameRef.current.setMatrixAt(i, temp.matrix);
      }
      topshelfRef.current.instanceMatrix.needsUpdate = true;
      frameRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [shelfCount, spacing]);

  return (
    <group position={[0, -0.6, 0]} rotation={[0, 0.9, 0]}>
      {/* Bottom shelf - Always rendered */}
      <Center bottom>
        <mesh
          geometry={nodes.bottomshelf.geometry}
          castShadow
          ref={rackRef}
          scale={[selectedRack?.length / 100, 1, 1]}
        >
          <meshStandardMaterial color={shelfColor?.hex} roughness={0.8} />
        </mesh>

        {/* Instanced top shelves */}
        <instancedMesh
          ref={topshelfRef}
          args={[nodes.topshelf.geometry, undefined, shelfCount]}
          castShadow
          scale={[selectedRack?.length / 100, 1, 1]}
        >
          <meshStandardMaterial color={shelfColor?.hex} roughness={1} />
        </instancedMesh>

        <instancedMesh
          ref={frameRef}
          args={[nodes.frame.geometry, undefined, shelfCount]}
          castShadow
          scale={[selectedRack?.length / 100, 1, 1]}
        >
          <meshStandardMaterial color={frameColor?.hex} roughness={0.4} />
        </instancedMesh>

        <AccumulativeShadows
          temporal
          frames={100}
          color='black'
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

useGLTF.preload('/models/mat_rack.glb');

export default Rack;
