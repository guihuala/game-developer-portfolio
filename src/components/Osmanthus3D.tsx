import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = () => {
  const { scene } = useGLTF('/小桂花.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      const targetRotationY = state.pointer.x * 0.2;
      const targetRotationX = -state.pointer.y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    <group ref={groupRef} scale={1.2} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const ProceduralOsmanthus = () => (
  <group>
    {[0, 1, 2, 3].map((i) => (
      <mesh key={i} rotation={[0, 0, (Math.PI / 2) * i]} position={[Math.cos((Math.PI / 2) * i) * 0.12, Math.sin((Math.PI / 2) * i) * 0.12, 0]} scale={[1.2, 0.6, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#FFF59D" emissive="#FBC02D" emissiveIntensity={0.5} roughness={0.2} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} transparent opacity={0.95} />
      </mesh>
    ))}
    <mesh position={[0, 0, 0.01]} scale={[1, 1, 0.1]}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color="#FFB300" emissive="#FF8F00" emissiveIntensity={0.8} />
    </mesh>
  </group>
);

const FloatingFlowers = () => {
  const flowers = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        radius: 1 + Math.random() * 0.4,
        baseAngle: angle,
        speed: 0.3 + Math.random() * 0.2,
        yOffset: (Math.random() - 0.5) * 1.5,
        scale: 0.5 + Math.random() * 0.4,
        rotationSpeed: [Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02] as [number, number, number]
      };
    });
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const flower = flowers[i];
        const currentAngle = flower.baseAngle + state.clock.elapsedTime * flower.speed;
        child.position.x = Math.cos(currentAngle) * flower.radius;
        child.position.z = Math.sin(currentAngle) * flower.radius;
        child.position.y = flower.yOffset + Math.sin(state.clock.elapsedTime * flower.speed * 2 + flower.baseAngle) * 0.3;
        child.rotation.x += flower.rotationSpeed[0];
        child.rotation.y += flower.rotationSpeed[1];
        child.rotation.z += flower.rotationSpeed[2];
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {flowers.map((props, i) => (
        <group key={i} scale={props.scale}>
          <ProceduralOsmanthus />
        </group>
      ))}
    </group>
  );
};

useGLTF.preload('/小桂花.glb');

export const Osmanthus3D: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.0} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E0F7FA" />
          <pointLight position={[0, 0, 2]} intensity={0.6} color="#FFD54F" />

          <Float
            speed={1.2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[0.05, 0.1]}
          >
            <group position={[0, 0.4, 0]}>
              <Model />
              <FloatingFlowers />
            </group>
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
          />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2} far={4} color="#00BCD4" />
        </Suspense>
      </Canvas>
    </div>
  );
};
