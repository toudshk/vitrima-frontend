//@ts-nocheck
import React, { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useMemo, useRef } from "react";
import {
  Color,
  IcosahedronGeometry,
  MeshDepthMaterial,
  MeshPhysicalMaterial,
  RGBADepthPacking,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils";
import { useMediaQuery } from "usehooks-ts";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

const Experiment = ({ shouldReduceQuality, isMobile, onLoaded }) => {
  const materialRef = useRef(null);
  const depthMaterialRef = useRef(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime;
      materialRef.current.uniforms.uPositionFrequency.value = uPositionFrequency;
    materialRef.current.uniforms.uTimeFrequency.value = uTimeFrequency;
    materialRef.current.uniforms.uStrength.value = uStrength;
    materialRef.current.uniforms.uWarpPositionFrequency.value = uWarpPositionFrequency;
    materialRef.current.uniforms.uWarpTimeFrequency.value = uWarpTimeFrequency;
    materialRef.current.uniforms.uWarpStrength.value = uWarpStrength;
    materialRef.current.uniforms.uColorA.value.set(uColorA);
    materialRef.current.uniforms.uColorB.value.set(uColorB);
    }

    if (depthMaterialRef.current) {
      depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
    }
    
  });

  const {
    uTimeFrequency,
    uPositionFrequency,
    uWarpPositionFrequency,
    uWarpTimeFrequency,
    uWarpStrength,
    uStrength,
    uColorA,
    uColorB,
    roughness,
    metalness,
    reflectivity,
    ior
  } = {
    uColorA: "#000",
    uColorB: "#968fff",
    uPositionFrequency: 1.70,
    uTimeFrequency: 0.68,
    uStrength: 0.18,
    uWarpPositionFrequency: 0.66,
    uWarpStrength: 0.68,
    uWarpTimeFrequency: 0.2,
    roughness: 0.0,
    metalness: 0.77,
    reflectivity: 0.4,
    ior: 5.0,
  };



  // const {
  //   uTimeFrequency,
  //   uPositionFrequency,
  //   uWarpPositionFrequency,
  //   uWarpTimeFrequency,
  //   uWarpStrength,
  //   uStrength,
  //   uColorA,
  //   uColorB,
  //   speed,
  //   roughness,
  //   metalness,
  //   clearcoat,
  //   reflectivity,
  //   ior
  // } = useControls({
   
  //   uColorA: "#000",
  //   uColorB: "#968fff",

  //   uPositionFrequency: {
  //       value: 0.94,
  //       min: 0.0,
  //       max: 10.0,
  //       step: 0.01
  //   },
  //   uTimeFrequency: {
  //       value:0.68,
  //       min: 0.0,
  //       max: 2.0,
  //       step: 0.02
  //   },
  //   uStrength:{
  //       value: 0.18,
  //       min: 0.0,
  //       max: 2.0,
  //       step: 0.02
  //   },
  //   uWarpPositionFrequency: {
  //       value: 0.66,
  //       min: 0.0,
  //       max: 5.0,
  //       step: 0.01
  //   },
  
  //   uWarpStrength: {
  //       value: 0.68,
  //       min: 0.0,
  //       max: 1.0,
  //       step: 0.01
  //   },
  //   uWarpTimeFrequency:{
  //       value: 0.20,
  //       min: 0.0,
  //       max: 1.0,
  //       step: 0.01
  //   },

   
   
  //   roughness: {
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //     value: 0.0,
  //   },
  //   metalness: {
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     value: 0.77,
  //   },
    
  //   reflectivity: {
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //     value: 0.40,
  //   },
  //   ior: {
  //     min: 0.001,
  //     max: 5,
  //     step: 0.001,
  //     value: 5.00,
  //   },
 
  // });

const ambientLightColor = "#fff";
const ambientLightIntensity = 1;

const directionalLightColor = "#fff";
const directionalLightIntensity = 5;
const directionalLightPositionX = 2.25;
const directionalLightPositionY = 3.17;
const directionalLightPositionZ = 10.0;


//   const { intensity: ambientLightIntensity, color: ambientLightColor } =
//     useControls("Ambient light", {
//       color: "#fff",
//       intensity: {
//         value: 1,
//         min: 0,
//         max: 1,
//         step: 0.001,
//       },
//     });

//   const {
//     intensity: directionalLightIntensity,
//     color: directionalLightColor,
//     positionX: directionalLightPositionX,
//     positionY: directionalLightPositionY,
//     positionZ: directionalLightPositionZ,
//   } = useControls("Directional light", {
//     color: "#fff",
//     intensity: {
//       value: 5,
//       min: 0,
//       max: 5,
//       step: 0.001,
//     },
//     positionX: {
//       value: 2.25,
//       min: -10,
//       max: 10,
//       step: 0.001,
//     },
//     positionY: {
//       value: 3.17,
//       min: -10,
//       max: 10,
//       step: 0.001,
//     },
//     positionZ: {
//       value: 10.0,
//       min: -10,
//       max: 10,
//       step: 0.001,
//     },
//   });

  const geometry = useMemo(() => {
    const geometry = mergeVertices(
      new IcosahedronGeometry(1.3, 80)
    );
    geometry.computeTangents();
    return geometry;
  }, [shouldReduceQuality]);

  const uniforms = {
    uTime: { value: 0 },
    uPositionFrequency: {value: uPositionFrequency},
    uTimeFrequency: { value: uTimeFrequency },
    uStrength: { value: uStrength },
    uWarpPositionFrequency: { value: uWarpPositionFrequency },
    uWarpTimeFrequency: { value: uWarpTimeFrequency },
    uWarpStrength: { value: uWarpStrength },
    uColorA: { value: new Color(uColorA) },
    uColorB: { value: new Color(uColorB) },
  };

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <>
      <mesh
        geometry={geometry}
        frustumCulled={false}
        position={[0, isMobile ? 1.3 : 0, 0]}
      >
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshPhysicalMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          silent
          roughness={roughness}
          metalness={metalness}
          reflectivity={reflectivity}
          ior={ior}
          uniforms={uniforms}
        />
        <CustomShaderMaterial
          ref={depthMaterialRef}
          baseMaterial={MeshDepthMaterial}
          vertexShader={vertexShader}
          uniforms={uniforms}
          silent
          depthPacking={RGBADepthPacking}
          attach="customDepthMaterial"
        />
      </mesh>
      <ambientLight
        color={ambientLightColor}
        intensity={ambientLightIntensity}
      />
      <directionalLight
        color={directionalLightColor}
        intensity={directionalLightIntensity}
        position={[
          directionalLightPositionX,
          directionalLightPositionY,
          directionalLightPositionZ,
        ]}
      />
    </>
  );
};

const SphereModel = () => {
  const isTablet = useMediaQuery("(max-width: 1199px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      document.body.classList.remove("loading");
    }
  }, [isLoaded]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="h-full md:h-[100vh]" >
      <Canvas
      
        camera={{
          position: [0, 1, 2],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
       
        gl={{ alpha: true }} 
      >
        <Suspense fallback={null}>
          <Experiment
            shouldReduceQuality={isTablet}
            isMobile={isMobile}
            onLoaded={handleLoad}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SphereModel;
