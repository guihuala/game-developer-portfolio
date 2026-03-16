import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  // Load the custom GLB model from the public folder
  const { scene } = useGLTF('/小桂花.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating and mouse-following rotation effect for the model
  useFrame((state) => {
    if (groupRef.current) {
      // Floating bounce
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Calculate target rotation based on mouse position
      // clamp the rotation so it never shows the back
      // pointer ranges from -1 to 1
      const targetRotationY = state.pointer.x * 0.3; // max 0.3 rad (~17 deg)
      const targetRotationX = -state.pointer.y * 0.2; // max 0.2 rad (~11 deg)
      
      // Smoothly interpolate current rotation to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    // Positioned more left
    <group ref={groupRef} scale={1.1} position={[-0.5, 0.4, 0]}>
      {/* We use primitive to render the loaded Three.js scene */}
      <primitive object={scene} />
    </group>
  );
};

const FloatingFlowers = () => {
  const { scene } = useGLTF('/小桂花.glb');
  
  const flowers = React.useMemo(() => {
    return Array.from({ length: 7 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 5 - 0.5, // Center roughly around -0.5
        (Math.random() - 0.5) * 4 + 0.5,
        (Math.random() - 0.5) * 3 - 1
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const flower = flowers[i];
        child.position.y += Math.sin(state.clock.elapsedTime * flower.speed + flower.offset) * 0.003;
        child.rotation.y += 0.002 * flower.speed;
        child.rotation.x += 0.001 * flower.speed;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {flowers.map((props, i) => (
        <group key={i} position={props.position} scale={props.scale} rotation={props.rotation}>
          <primitive object={scene.clone()} />
        </group>
      ))}
    </group>
  );
};

// Preload the model to prevent popping in later
useGLTF.preload('/小桂花.glb');

export const Osmanthus3D: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffffff" shadow-bias={-0.0001} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E0F7FA" />
          <pointLight position={[0, 0, 2]} intensity={0.6} color="#FFD54F" />
          
          <Float
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={1.5}
            floatingRange={[-0.2, 0.2]}
          >
            <Model />
            <FloatingFlowers />
          </Float>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={false}
            autoRotate={false}
          />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={10} blur={2} far={4} color="#00BCD4" />
        </Suspense>
      </Canvas>
    </div>
  );
};
