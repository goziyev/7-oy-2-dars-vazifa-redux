import React, { useState, useEffect } from "react";

const App = () => {
  const [streamStarted, setStreamStarted] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    getCameraSelection();
  }, []);

  const getCameraSelection = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setDevices(videoDevices);

    // Avtomatik ravishda birinchi kamerani tanlash
    if (videoDevices.length > 0) {
      setSelectedDeviceId(videoDevices[0].deviceId);
    }
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId },
      });
      handleStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStream = (stream) => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.srcObject = stream;
      setStreamStarted(true);
    }
  };

  const handlePlayClick = () => {
    startStream();
  };

  const takeScreenshot = () => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setScreenshots([...screenshots, dataUrl]);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <video
        autoPlay
        style={{
          width: "80%",
          maxWidth: "600px",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
      <div>
        {devices.length > 0 && (
          <>
            <button
              onClick={handlePlayClick}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {streamStarted ? "Camera On" : "Start Camera"}
            </button>
            <button
              onClick={takeScreenshot}
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Take Screenshot
            </button>
          </>
        )}
        {devices.length === 0 && <p>No cameras found</p>}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              style={{ width: "150px", height: "auto", margin: "5px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
