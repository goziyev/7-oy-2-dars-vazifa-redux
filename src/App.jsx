import Webcam from "react-webcam";
import "./App.css";
import { CustomWebcam } from "./components/camera";
function App() {
  return (
    <div className="container">
      <CustomWebcam />
    </div>
  );
}

export default App;
