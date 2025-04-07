'use client'


import { Suspense } from 'react';


import Rack from '@/components/Rack';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import Configurator from '@/components/Configurator';
import { useCustomization } from '@/contexts/Customization';



const Experience = () => {
    const { selectedRack } = useCustomization();

    return (
        <div className='font-quicksand h-full w-screen flex flex-col md:h-screen overflow-auto  gap-4 md:flex-row md:gap-8 font-quicksand pt-20 md:p-6 md:pt-12 items-center md:items-start'>
            <div className='h-72 w-[100%]  md:h-full md:w-8/12 md:border md:border-gray-300 rounded-2xl overflow-hidden'>
                <Canvas
                    shadows
                    className='touch-none  '
                    camera={{ position: [0, 1.5, 3.5], fov: 45 }}
                    dpr={1.5}
                    gl={{ preserveDrawingBuffer: true }}
                >
                    <color attach='background' args={['#fff']} />
                    <Rack shelfCount={selectedRack?.levels - 1} />
                    <OrbitControls
                        makeDefault
                        minPolarAngle={1}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 2}
                    />
                    <Environment preset='city' />
                </Canvas>
            </div>
            <Suspense fallback={<p>Loading Configurator...</p>}>
                <Configurator />
            </Suspense>
        </div>
    );
};

export default Experience;
