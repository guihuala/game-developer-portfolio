import React, { useRef, Suspense, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { siteContent } from '../content/siteContent';

const Model = ({ onReady }: { onReady: () => void }) => {
  const { scene } = useGLTF(siteContent.assets.flowerModel);
  const groupRef = useRef<THREE.Group>(null);
  useEffect(() => { onReady(); }, [onReady]);

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
        <meshStandardMaterial color="#FFF59D" emissive="#FBC02D" emissiveIntensity={0.3} roughness={0.6} />
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

// A demand-driven clock keeps idle rendering at 30 fps and stops off screen.
const SceneClock = ({ active }: { active: boolean }) => {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const timer = window.setInterval(() => invalidate(), 1000 / 30);
    return () => window.clearInterval(timer);
  }, [active, invalidate]);
  return null;
};

export const Osmanthus3D: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const revealModel = useCallback(() => setReady(true), []);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setActive(visible && !document.hidden && !query.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (container.current) observer.observe(container.current);
    document.addEventListener('visibilitychange', update);
    query.addEventListener('change', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); query.removeEventListener('change', update); };
  }, []);
  return (
    <div ref={container} className={`osmanthus-scene w-full h-full relative cursor-grab active:cursor-grabbing ${ready ? 'is-ready' : ''}`} role="img" aria-label="桂花 3D 模型 / Osmanthus 3D model">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 50 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <SceneClock active={active} />
        <Suspense fallback={null}>
          <ambientLight intensity={1.0} />
          <hemisphereLight args={['#ffffff', '#E0F7FA', 0.7]} />
          <directionalLight position={[3, 4, 6]} intensity={1.7} color="#ffffff" />
          <directionalLight position={[-4, 2, 4]} intensity={0.8} color="#F0FBFF" />
          <directionalLight position={[0, 3, -4]} intensity={0.5} color="#FFF9E6" />

          <Float
            speed={1.2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[0.05, 0.1]}
          >
            <group position={[0, 0.4, 0]}>
              <Model onReady={revealModel} />
              <FloatingFlowers />
            </group>
          </Float>

          <OrbitControls
            enableDamping={false}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minAzimuthAngle={THREE.MathUtils.degToRad(-45)}
            maxAzimuthAngle={THREE.MathUtils.degToRad(45)}
            minPolarAngle={THREE.MathUtils.degToRad(65)}
            maxPolarAngle={THREE.MathUtils.degToRad(115)}
            autoRotate={false}
          />
          <ContactShadows frames={1} position={[0, -1.5, 0]} opacity={0.18} scale={10} blur={2} far={4} color="#00BCD4" />
        </Suspense>
      </Canvas>
    </div>
  );
};
