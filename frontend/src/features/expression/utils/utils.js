 import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

 
 
 export async function init({ videoRef, landmarkerRef, streamRef, setExpression }) {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

        const faceLandmarker = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
          }
        );

        landmarkerRef.current = faceLandmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        detect();
      } catch (error) {
        console.error("Initialization error:", error);
        setExpression("Camera or Model Error");
      }
    }

export async function detect({ videoRef, landmarkerRef, streamRef, setExpression }) {
   

      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      if (!video || !landmarker) return;

      const now = performance.now();
      const results = landmarker.detectForVideo(video, now);

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const browDownLeft = getScore("browDownLeft");
        const browDownRight = getScore("browDownRight");
        const jawOpen = getScore("jawOpen");

        if (smileLeft > 0.5 && smileRight > 0.5) {
          setExpression("😊 Smiling");
        } else if (browDownLeft > 0.2 && browDownRight > 0.2) {
          setExpression("😠 Angry");
        } else if (jawOpen > 0.002) {
          setExpression("😮 Surprised");
        } else {
          setExpression("😐 Neutral");
        }
      }

      
    }