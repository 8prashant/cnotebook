import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home.js";
import About from "./component/About";
import NoteState from "./contexts/notes/NoteState.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./component/Alert.js";
import Login from "./component/Login.js";
import Signup from "./component/Signup.js";

function App() {
  return (
    <Router>
      <NoteState>
        <Navbar />
        <Alert />
        <div className="container mt-4">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </NoteState>
    </Router>
  );
}

export default App;
