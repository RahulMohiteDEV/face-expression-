import React, { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

   let isMounted = true;


  const [expression, setExpression] = useState("Detecting...");

   

  useEffect(() => {
   

    init({ videoRef, landmarkerRef, animationFrameRef, streamRef, setExpression });

    return () => {
      isMounted = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "400px", borderRadius: "10px" }}
      />
      <h2>{expression}</h2>
      <button onClick={() => detect({ videoRef, landmarkerRef, animationFrameRef, streamRef, setExpression })}>Detect Expression</button>
    </div>
  );
}