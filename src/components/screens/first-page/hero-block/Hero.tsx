// @ts-nocheck
import Image from "next/image";
import styles from "./Hero.module.scss";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { useRef, useReducer, useMemo, FC, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  useProgress,
  Html,
  Loader,
} from "@react-three/drei";
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { easing } from "maath";
import zIndex from "@mui/material/styles/zIndex";

function LoaderBlock() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Loading...</p>
        <p className="text-sm">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}


const Scene = (props: any) => {
  const accents = ["#E7F0FF", "#1C60C5", "#113E81"];
  const shuffle = (accent = 0) => [
    { color: "#444", roughness: 0.1 },
    { color: "#444", roughness: 0.75 },
    { color: "#444", roughness: 0.75 },
    { color: "white", roughness: 0.1 },
    { color: "white", roughness: 0.75 },
    { color: "white", roughness: 0.1 },
    { color: "#1C60C5", roughness: 0.1, accent: true },
    { color: "#1C60C5", roughness: 0.75, accent: true },
    { color: "#1C60C5", roughness: 0.1, accent: true },
  ];
  const [accent, click] = useReducer((state) => ++state, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  return (
    <>
      <Canvas
        onClick={click}
        // shadows
        dpr={[1, 1]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
        {...props}
      >
        <Suspense fallback={<LoaderBlock/>}>
          <color attach="background" args={["#c5c5c5"]} />
          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Physics /*debug*/ gravity={[0, 0, 0]}>
            <Pointer />
            {
              connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */
            }
            <Connector position={[10, 10, 5]}>
              <Model>
                <MeshTransmissionMaterial
                  clearcoat={1}
                  thickness={0.1}
                  anisotropicBlur={0.1}
                  chromaticAberration={0.1}
                  samples={8}
                  resolution={8}
                />
              </Model>
            </Connector>
          </Physics>
          <EffectComposer disableNormalPass multisampling={8}>
            <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
          </EffectComposer>
          <Environment resolution={128}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer
                form="circle"
                intensity={4}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, -1, -1]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={8}
              />
            </group>
          </Environment>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );
  });
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && (
        <pointLight intensity={4} distance={2.5} color={props.color} />
      )}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

function Model({ children, color = "white", roughness = 0, ...props }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/c-transformed.glb");
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={10}
      geometry={nodes.connector.geometry}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />
      {children}
    </mesh>
  );
}

const Hero: FC = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, delay: 0.7 });

    gsap.to("#link", { opacity: 1, delay: 1.5 });
  }, []);

  return (
    <section className={styles.mainBlock}>
      <div className={styles.content}>
        <div className={styles.rightBlock}>
          <h2 id="title">
            подбор
            <br />
            исполнителей
          </h2>
          <div className={styles.links}>
            <Link id="link" href={"/project"} >
              <span>заказать подбор</span> <SouthEastIcon />
            </Link>
            <Link id="link" href={"/select-feed"}>
            <span>лента работ</span> <SouthEastIcon />
          </Link>
          </div>
        </div>

        <Scene
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
