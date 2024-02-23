import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback
import "./index.css";
import { useDispatch } from "react-redux";
export const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch()
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    dispatch({type:"Add_customer",payload:imageSrc})
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <Webcam height={500} width={500} ref={webcamRef} />
      <div className="buttons">
        <button onClick={capture}>Capture photo</button>
        <button onClick={retake}>Retake photo</button>
      </div>
      {imgSrc && <img src={imgSrc} alt="webcam" />}
    </div>
  );
};
