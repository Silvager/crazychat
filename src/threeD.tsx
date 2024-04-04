import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { BufferGeometry, Mesh, TextureLoader } from "three";

export default function ThreeD() {
    const colorMap = useLoader(TextureLoader, "amogus.png");
    const meshRef = useRef<Mesh | undefined>();
    useFrame((state, delta) => {
        if (meshRef.current) {
         meshRef.current.rotation.x += delta;
        }
        })
    return (
        <div id="canvasDiv">
         <Canvas>
            <Suspense fallback={null}>
        <ambientLight intensity={0.1}/>
        <directionalLight color="red" position={[0, 0, 5]}/>
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial map={colorMap}/>
        </mesh>
        </Suspense>
    </Canvas>
    </div>);
}