import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { BufferGeometry, Mesh, TextureLoader } from "three";

function SusBox() {
    const colorMap = useLoader(TextureLoader, "amogus.png");
    const [frames, setFrames] = useState(0);
    const meshRef = useRef<Mesh | undefined>();
    useFrame((state, delta) => {
        setFrames(frames+1);
        if (meshRef.current) {
         meshRef.current.rotation.x += delta;
         meshRef.current.rotation.y += delta;
         meshRef.current.position.x = Math.sin(frames/15)*10;
        }
        })
    return(<mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]}/>
        <meshStandardMaterial map={colorMap}/>
    </mesh>);
}

export default function ThreeD() {
    return (
        <div id="canvasDiv">
         <Canvas>
        <ambientLight intensity={0.1}/>
        <directionalLight color="red" position={[0, 0, 5]}/>
        <SusBox/>
    </Canvas>
    </div>);
}