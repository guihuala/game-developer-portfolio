import React, { useRef, Suspense, useLayoutEffect } from 'react';
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
    // Positioned more center-right
    <group ref={groupRef} scale={1.1} position={[0.2, 0.4, 0]}>
      {/* We use primitive to render the loaded Three.js scene */}
      <primitive object={scene} />
    </group>
  );
};

const ProceduralOsmanthus = () => {
  return (
    <group>
      {/* 4 Petals */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          rotation={[0, 0, (Math.PI / 2) * i]} 
          position={[Math.cos((Math.PI / 2) * i) * 0.12, Math.sin((Math.PI / 2) * i) * 0.12, 0]}
          scale={[1.2, 0.6, 0.2]} // Flatten the spheres into petal shapes
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial 
            color="#FFF59D" 
            emissive="#FBC02D" 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent={true}
            opacity={0.95}
          />
        </mesh>
      ))}
      {/* Center Pistil */}
      <mesh position={[0, 0, 0.01]} scale={[1, 1, 0.1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#FFB300" 
          emissive="#FF8F00" 
          emissiveIntensity={0.8} 
        />
      </mesh>
    </group>
  );
};

const FloatingFlowers = () => {
  const flowers = React.useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        radius: 1.5 + Math.random() * 0.5,
        baseAngle: angle,
        speed: 0.3 + Math.random() * 0.2,
        yOffset: (Math.random() - 0.5) * 2,
        scale: 0.6 + Math.random() * 0.4,
        rotationSpeed: [Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02] as [number, number, number]
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const flower = flowers[i];
        // Orbit rotation
        const currentAngle = flower.baseAngle + state.clock.elapsedTime * flower.speed;
        
        // Circular orbit + gentle bobbing
        child.position.x = Math.cos(currentAngle) * flower.radius;
        child.position.z = Math.sin(currentAngle) * flower.radius;
        child.position.y = flower.yOffset + Math.sin(state.clock.elapsedTime * flower.speed * 2 + flower.baseAngle) * 0.4;

        // Self rotation
        child.rotation.x += flower.rotationSpeed[0];
        child.rotation.y += flower.rotationSpeed[1];
        child.rotation.z += flower.rotationSpeed[2];
      });
    }
  });

  return (
    <group ref={groupRef} position={[0.2, 0.4, 0]}>
      {flowers.map((props, i) => (
        <group key={i} scale={props.scale}>
          <ProceduralOsmanthus />
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
