import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import gsap from "gsap";

const LoaderBlock = () => {
  const { progress } = useProgress();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      gsap.to("#loader", { opacity: 0, duration: 1, onComplete: () => setHidden(true) });
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div
      id="loader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontSize: "24px",
        zIndex: 1000,
      }}
    >
      Загрузка {Math.round(progress)}%
    </div>
  );
};



export default LoaderBlock;
