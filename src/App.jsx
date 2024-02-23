import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import { CustomWebcam } from "./components/camera";
import Gallery from "./components/gallery";

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/">Camera</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CustomWebcam />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
