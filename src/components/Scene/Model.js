import React, { useRef,useState,useEffect} from 'react'
import { MeshTransmissionMaterial, useGLTF, Text, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { nodes } = useGLTF("/medias/mylogo.glb");
    const { viewport,camera, gl: { domElement } } = useThree();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  
 
    useEffect(() => {
        const updateCameraPosition = (event) => {
            setMousePosition({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: - (event.clientY / window.innerHeight) * 2 + 1
            });
        };

        domElement.addEventListener('mousemove', updateCameraPosition);

        return () => {
            domElement.removeEventListener('mousemove', updateCameraPosition);
        };
    }, [domElement]);

    useEffect(() => {
        camera.position.x = mousePosition.x * 10;
        camera.position.y = mousePosition.y * 10;
        camera.lookAt(0, 0, 0);
    }, [camera, mousePosition]);

    const torus = useRef(null);
    
    useFrame( () => {
        torus.current.rotation.y += 0.02
    })

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0.3, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 0.8, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.42, min: 0, max: 1},
        backside: { value: true},
    })
  const meshProps = useControls({
    color: { value: '#ff0000', label: 'Color' },
    scale: { value: 0.2, min: 0, max: 1, step: 0.1 },
    rotation: { value: 3.0, min: 0, max: Math.PI * 2, step: 0.2 },
  });
    
    return (
      <group scale={viewport.width / 3.75} >
      <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0, 0, 0.2]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          SIYU HU
        
          
        </Text>
             <Text font={'/fonts/PPNeueMontreal-Bold.otf'} position={[0,0.2,0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
           UXE Designer and Developer
        
          
      </Text>
      <mesh ref={torus} {...nodes.Cylinder} {...meshProps} rotation={[Math.PI, meshProps.rotation, Math.PI*0.5 ]}>
        <MeshTransmissionMaterial {...materialProps}/>
      </mesh>
      <OrbitControls />
      </group>
    )
}
